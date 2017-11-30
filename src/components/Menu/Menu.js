import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'object.omit';


class Menu extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        inlineIndent: PropTypes.number,
        inlineCollapsed: PropTypes.bool,
        mode: PropTypes.oneOf['vertical', 'inline', 'horizontal'],
        selectable: PropTypes.bool,
        onClick: PropTypes.func,
        onOpen: PropTypes.func,
        onSelect: PropTypes.func
    }
    static defaultProps = {
        prefixCls: 'k-menu',
        inlineIndent: 24,
        inlineCollapsed: false,
        mode: 'vertical',
        selectable: true
    }
    render() {
        const { className, mode, children, prefixCls } = this.props;
        let classString = classnames(className, {
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-root`]: true,
        });
        let props = omit(this.props, ['children']);
        return (
            <ul className={classString}>
                {
                    React.Children.map(children, (child, i, subIndex) => {
                        if (!child) {
                            return null;
                        }
                        return React.cloneElement(child, { ...props });
                    })

                }
            </ul>
        )
    }
}

export default Menu;