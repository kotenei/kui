import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import Tooltip from '../Tooltip';

let prefixCls = 'k-popover';

class Popover extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        title: PropTypes.node,
        content: PropTypes.node.isRequired
    }
    renderPopover() {
        const { title, content } = this.props;
        return (
            <div>
                {
                    title ? <div className={`${prefixCls}-title`}>
                        {title}
                    </div> : null
                }
                <div className={`${prefixCls}-inner-content`}>
                    {content}
                </div>
            </div>
        )
    }
    render() {
        let popover = this.renderPopover();
        const otherProps = omit(this.props, [
            'children',
            'title',
            'content',
            'kStyle'
        ]);
        return (
            <Tooltip
                ref="tooltip"
                kClass={prefixCls}
                title={popover}
                {...otherProps}
            >
                {this.props.children}
            </Tooltip>
        )
    }
}

export default Popover;