import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FirstChild } from '../../utils';
import Icon from '../Icon';

class CollapsePanel extends Component {
    static propTypes = {
        index: PropTypes.number,
        id: PropTypes.string.isRequired,
        header: PropTypes.node,
        activeIds: PropTypes.array,
        disabled: PropTypes.bool,
        onClick: PropTypes.func
    }
    static defaultProps = {
        activeIds: [],
        disabled: false
    }
    handleClick = (e) => {
        const { onClick, id, index, disabled } = this.props;
        if (disabled) {
            return;
        }
        if (onClick) {
            onClick(e, id)
        }
    }
    renderBody(isShow) {
        const { prefixCls, children } = this.props;
        let body = isShow ? (
            <CSSTransition
                timeout={300}
                classNames='slide'>
                <div className={`${prefixCls}-body`}>
                    {children}
                </div>
            </CSSTransition>
        ) : null;
        return (
            <TransitionGroup component={FirstChild}>
                {body}
            </TransitionGroup>
        )
    }
    render() {
        const { prefixCls, activeIds, id, children, header, disabled } = this.props;
        let isShow = activeIds.indexOf(id) != -1
        let classString = classnames({
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-active`]: isShow,
        })
        return (
            <div className={classString}>
                <div className={classnames({
                    [`${prefixCls}-head`]: true,
                    'disabled':disabled
                })} onClick={this.handleClick}>
                    {header}
                    <Icon className={`${prefixCls}-icon`} type={isShow ? 'down' : 'right'} />
                </div>
                {this.renderBody(isShow)}

            </div>
        )
    }
}

export default CollapsePanel;