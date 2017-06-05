import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { kStyles, kClass, kSize, getClassSet } from '../../utils/kUtils';
import { State, PRIMARY, Sizes } from '../../utils/styleMaps';
import Icon from '../Icon';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }
    static propTypes = {
        showIcon: PropTypes.bool,
        closeText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        closable: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        onClose: PropTypes.func
    }
    static defaultProps = {
        showIcon: false,
        closable: false,
        onClose: () => { }
    }
    handleClose() {
        const { onClose } = this.props;
        onClose();
    }
    render() {
        const { title, description, showIcon, closable, closeText } = this.props;
        let classes = getClassSet(this.props);

        let iconType = '';
        switch (this.props.kStyle) {
            case 'primary':
                break;
            case 'info':
                break;
            case 'success':
                break;
            case 'warning':
                break;
            case 'danger':
                break;
            default:
                break;
        }

        return (
            <div className={classnames(classes)}>
                {showIcon ? <Icon type={iconType} /> : null}
                
            </div>
        )
    }
}

const styles = State.values().concat(PRIMARY);

export default kStyles(styles,
    kClass('k-Alert', Alert)
);