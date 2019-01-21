import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import classnames from "classnames";
import {
    kStyles,
    kClass,
    kSize,
    prefix,
    getClassSet
} from "../../utils/kUtils";
import { guid } from "../../utils";
import { State, DEFAULT, PRIMARY, Sizes } from "../../utils/styleMaps";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Tag extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            closed: false
        };
    }
    static propTypes = {
        color: PropTypes.string,
        closable: PropTypes.bool,
        iconColor: PropTypes.string,
        onClose: PropTypes.func
    };
    static defaultProps = {
        closable: false,
        onClose: () => {
            return true;
        }
    };
    handleClose(e) {
        const { onClose } = this.props;
        if (onClose() == true) {
            this.setState({
                closed: true
            });
        }
    }
    render() {
        const { closable, children, color, iconColor } = this.props;
        const { closed } = this.state;
        let classString = getClassSet(this.props);
        const tag = closed ? null : (
            <CSSTransition key={guid()} timeout={300} classNames="fade">
                <div
                    className={classnames(classString)}
                    style={{ background: color, color: color ? "#fff" : null }}
                >
                    <span className="k-tag-text">{children}</span>
                    {closable ? (
                        <Icon
                            type="close"
                            color={iconColor}
                            onClick={this.handleClose}
                        />
                    ) : null}
                </div>
            </CSSTransition>
        );
        return (
            <TransitionGroup component={React.Fragment} >
                {tag}
            </TransitionGroup>
        );
    }
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(
    styles,
    DEFAULT,
    kSize([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL], kClass("k-tag", Tag))
);
