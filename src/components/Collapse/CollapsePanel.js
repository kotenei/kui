import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class CollapsePanel extends Component {
    static propTypes = {
        index: PropTypes.number,
        id: PropTypes.string.isRequired,
        header: PropTypes.node,
        activeIds: PropTypes.array
    }
    static defaultProps = {
        activeIds: []
    }
    render() {
        const { prefixCls, activeIds, id, children, header } = this.props;
        let classString = classnames({
            [`${prefixCls}-panel`]: true,
            [`${prefixCls}-active`]: activeIds.indexOf(id) != -1,
        })
        return (
            <div className={classString}>
                <div className={`${prefixCls}-head`}>
                    {header}
                </div>
                <div className={`${prefixCls}-body`}>
                    {children}
                </div>
            </div>
        )
    }
}

export default CollapsePanel;