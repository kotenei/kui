import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Collapse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIds: props.activeIds || props.defaultActiveIds || []
        }
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        activeIds: PropTypes.array,
        defaultActiveIds: PropTypes.array,
        onChange: PropTypes.func
    }
    static defaultProps = {
        prefixCls: 'k-collapse',
        defaultActiveIds: []
    }
    handleChange = (e) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange();
        }
    }
    componentWillReceiveProps(nextProps) {
        if ('activeIds' in nextProps) {
            this.setState({
                activeIds: nextProps.activeIds
            })
        }
    }
    render() {
        const { prefixCls, children } = this.props;
        const { activeIds } = this.state;
        let classString = classnames({
            [`${prefixCls}`]: true
        })
        return (
            <div className={classString}>
                {
                    React.Children.map(children, (child, index) => {
                        if (!child) {
                            return null;
                        }
                        return React.cloneElement(child, {
                            ...child.props,
                            prefixCls,
                            activeIds,
                            onClick: this.handleChange
                        })
                    })
                }
            </div>
        )
    }
}

export default Collapse;