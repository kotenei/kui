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
        this.animateEnd = this.animateEnd.bind(this);
        this.state = {
            closed: false,
            to: 1
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
        onClose: () => { }
    }
    handleClose() {
        const { onClose } = this.props;
        this.setState({
            to: 0
        })
        onClose();
    }
    animateEnd() {
        if (this.state.to == 0) {
            this.setState({
                closed: true
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
        return (
            this.state.closed ? null :
                <Animate to={this.state.to} attributeName="opacity" onAnimationEnd={this.animateEnd} duration={300}>
                    <div className={classnames(classes)}>
                        {showIcon && iconType ? <Icon type={iconType} className={classnames({ "k-alert-icon": true, "lg": description != null })} /> : null}
                        <div className="k-alert-content">
                            <span className="k-alert-title">{title}</span>
                            {description ? <span className="k-alert-description">{description}</span> : null}
                            {closable && !closeText ? <Icon type="close" className="k-alert-icon-close" onClick={this.handleClose} /> : null}
                            {closeText ? <span className="k-alert-closetext" onClick={this.handleClose}>{closeText}</span> : null}
                        </div>
                    </div>
                </Animate>
        )
    }
}

const styles = State.values();

export default kStyles(styles,
    kClass('k-alert', Alert)
);