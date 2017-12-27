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
        accordion: PropTypes.bool,
        onChange: PropTypes.func
    }
    static defaultProps = {
        prefixCls: 'k-collapse',
        defaultActiveIds: [],
        accordion: false
    }
    handleChange = (e, id) => {
        const { onChange, accordion } = this.props;
        const { activeIds } = this.state;
        let newActiveIds = accordion ? [] : [...activeIds];
        if (onChange) {
            onChange(e, id);
        }
        if (!('activeIds' in this.props)) {
            let index = activeIds.indexOf(id);

            if (index == -1) {
                newActiveIds.push(id);
            } else {
                newActiveIds.splice(index, 1);
            }
            this.setState({
                activeIds: newActiveIds
            })
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