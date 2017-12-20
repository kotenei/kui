import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import domUtils from '../../utils/domUtils';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { guid, FirstChild } from '../../utils/kUtils';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: { top: -999, left: -999 },
            selectedId: '-1',
            show: true
        }
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        menu: PropTypes.node,
        placement: PropTypes.oneOf['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'],
        onSelect: PropTypes.func
    }
    static defaultProps = {
        prefixCls: 'k-dropdown',
        placement: "bottomLeft"
    }
    setOrgSize() {
        let dom = ReactDOM.findDOMNode(this.refs.dropdownMenu);
        this.orgSize = {
            w: domUtils.outerWidth(dom),
            h: domUtils.outerHeight(dom)
        }
    }
    setPosition() {
        const { placement } = this.props;
        let parent = ReactDOM.findDOMNode(this.refs.trigger),
            ew = domUtils.outerWidth(parent),
            eh = domUtils.outerHeight(parent),
            tw = this.orgSize.w,
            th = this.orgSize.h,
            position = { left: 0, top: 0 };

        do {
            position.left += parent.offsetLeft - parent.scrollLeft;
            position.top += parent.offsetTop - parent.scrollTop;
        } while ((parent = parent.offsetParent) && parent != document.body);

        switch (placement) {
            case 'topLeft':
                position = { top: position.top - th, left: position.left };
                break;
            case 'topCenter':
                position = { top: position.top - th, left: position.left + ew / 2 - tw / 2 };
                break;
            case 'topRight':
                position = { top: position.top - th, left: position.left + ew - tw };
                break;
            case 'bottomLeft':
                position = { top: position.top + eh, left: position.left };
                break;
            case 'bottomCenter':
                position = { top: position.top + eh, left: position.left + ew / 2 - tw / 2 };
                break;
            case 'bottomRight':
                position = { top: position.top + eh, left: position.left + ew - tw };
                break;
            default:
                position = { top: position.top + eh, left: position.left };
                break;
        }
        this.setState({
            position
        })
    }
    handleMouseEnter = (e) => {
        this.setPosition();
        this.setState({
            show: true
        });
    }
    handleMouseLeave = (e) => {
        this.tm = setTimeout(() => {
            this.setState({
                show: false
            });
        }, 300);
    }
    handleMenuEnter = (e) => {
        if (this.tm) {
            clearTimeout(this.tm);
        }
        this.setState({
            show: true
        })
    }
    handleMenuLeave = (e) => {
        this.setState({
            show: false
        });
    }
    handleMenuSelect = (selectedIds) => {
        this.setState({
            selectedId: selectedIds[0]
        })
    }
    componentDidMount() {
        const { show } = this.props;
        this.setOrgSize();
        this.setState({
            show: false
        })
    }
    renderMenu() {
        const { menu, prefixCls } = this.props;
        const { position, show, selectedId } = this.state;
        if (!menu) {
            return null;
        }
        let newMenu = show ? <CSSTransition
            timeout={300}
            classNames="slide-bottom"
        >
            {
                React.cloneElement(menu, {
                    ...menu.props,
                    defaultSelectedIds: [selectedId],
                    ref: 'dropdownMenu',
                    mode: 'vertical',
                    className: classnames({
                        [`${prefixCls}`]: true,
                        'slide-bottom-enter':true
                    }),
                    style: position,
                    onMouseEnter: this.handleMenuEnter,
                    onMouseLeave: this.handleMenuLeave,
                    onSelect: this.handleMenuSelect
                })
            }
        </CSSTransition> : null;

        return ReactDOM.createPortal(
            <TransitionGroup component={FirstChild}>
                {newMenu}
            </TransitionGroup>
            , document.body);
    }
    renderChilren() {
        const { children } = this.props;
        return (
            React.Children.map(children, child => {
                if (!child) {
                    return null;
                }
                return React.cloneElement(child, {
                    ...child.props,
                    ref: 'trigger',
                    onMouseEnter: this.handleMouseEnter,
                    onMouseLeave: this.handleMouseLeave
                });
            })
        )
    }
    render() {
        return (
            <span>
                {this.renderChilren()}
                {this.renderMenu()}
            </span>
        )
    }
}

export default Dropdown;