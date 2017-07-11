import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Animate from 'react-smooth';
import { kStyles, kClass, kSize, getClassSet } from '../../utils/kUtils';
import { State, PRIMARY, Sizes } from '../../utils/styleMaps';
import Icon from '../Icon';


class Alert extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleAnimateEnd = this.handleAnimateEnd.bind(this);
        this.state = {
            closing: false,
            closed: false
        }
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
        onClose: () => {
            return true;
        }
    }
    handleClose() {
        const { onClose } = this.props;
        if (onClose() == true) {
            this.setState({
                closing: true
            })
        }
    }
    handleAnimateEnd() {
        if (this.state.closing) {
            this.setState({
                closed: true,
                closing: false
            });
        }
    }
    render() {
        const { title, description, showIcon, closable, closeText } = this.props;
        let classes = getClassSet(this.props);

        let iconType;
        switch (this.props.kStyle) {
            case 'info':
                iconType = "infocirlce";
                break;
            case 'success':
                iconType = "checkcircle";
                break;
            case 'warning':
                iconType = "exclamationcircle";
                break;
            case 'danger':
                iconType = "closecircle";
                break;
        }

        const alert = this.state.closed ? null : (
            <div className={classnames(classes)}>
                {
                    showIcon && iconType ? <Icon type={iconType} className={classnames({ "k-alert-icon": true, "lg": description != null })} /> : null
                }
                <div className="k-alert-content">
                    <span className="k-alert-title">{title}</span>
                    {description ? <span className="k-alert-description">{description}</span> : null}
                    {closable && !closeText ? <Icon type="close" className="k-alert-icon-close" onClick={this.handleClose} /> : null}
                    {closeText ? <span className="k-alert-closetext" onClick={this.handleClose}>{closeText}</span> : null}
                </div>
            </div>
        );

        return (
            <Animate canBegin={this.state.closing} to={0} from={1}
                attributeName="opacity"
                onAnimationEnd={this.handleAnimateEnd}
                duration={300}>
                {alert}
            </Animate>
        )
    }
}

const styles = State.values();

export default kStyles(styles,
    kClass('k-alert', Alert)
);