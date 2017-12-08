import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import omit from 'object.omit';

class SubMenu extends Component {
    static propTypes = {
        title: PropTypes.oneOfType[PropTypes.string, PropTypes.node],
        open: PropTypes.bool,
        disabled: PropTypes.bool
    }
    static defaultProps = {
        open: true,
        disabled: false
    }
    render() {
        const { prefixCls, mode, title, disabled, open, children, inlineIndent } = this.props;
        let classString = classnames({
            [`${prefixCls}-submenu`]: true,
            [`${prefixCls}-submenu-${mode}`]: true,
            [`${prefixCls}-submenu-open`]: open,
            [`${prefixCls}-submenu-disabled`]: disabled,
        });
        let ulClassString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-sub`]: true,
            'hidden': true
        });
        let props = omit(this.props, ['children', 'style']);
        return (
            <li className={classString} style={{ paddingLeft: inlineIndent }}>
                <div className={classnames({
                    [`${prefixCls}-submenu-title`]: true,
                    [`${prefixCls}-item`]: true
                })}
                    
                >
                    {title}
                    {children ? <Icon className="direction" type="down" /> : null}
                </div>
                <ul className={ulClassString}>
                    {
                        React.Children.map(children, (child, index) => {
                            if (!child) {
                                return null;
                            }
                            return React.cloneElement(child, { ...props });
                        })
                    }
                </ul>
            </li>
        )
    }
}

export default SubMenu;