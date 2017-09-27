import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';
import classnames from 'classnames';
import { kStyles, kClass, kSize, prefix, getClassSet, guid } from '../../utils/kUtils';
import { State, DEFAULT, PRIMARY, Sizes } from '../../utils/styleMaps';
import { CSSTransitionGroup } from 'react-transition-group';


class Tag extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            closed: false
        }
    }
    static propTypes = {
        color: PropTypes.string,
        closable: PropTypes.bool,
        onClose: PropTypes.func
    }
    static defaultProps = {
        closable: false,
        onClose: () => {
            return true;
        }
    }
    handleClose(e) {
        const { onClose } = this.props;
        if (onClose() == true) {
            this.setState({
                closed: true
            });
        }
    }
    render() {
        const { closable, children, color } = this.props;
        const { closed } = this.state;
        let classString = getClassSet(this.props);
        const tag = closed ? null : (
            <div
                key={guid()}
                className={classnames(classString)}
                style={{ background: color, color: color ? '#fff' : null }}>
                <span className="k-tag-text">{children}</span>
                {closable ? <Icon type="close" onClick={this.handleClose} /> : null}
            </div>
        )
        return (
            <CSSTransitionGroup
                component={FirstChild}
                transitionEnter={true}
                transitionLeave={true}
                transitionName='fade'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {tag}
            </CSSTransitionGroup>
        )
    }
}

function FirstChild(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(styles, DEFAULT,
    kSize([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
        kClass('k-tag', Tag)
    )
);