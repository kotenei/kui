import React, { Component, PropTypes } from 'react';
import Animate from 'react-smooth';
import Icon from '../Icon';
import classnames from 'classnames';
import { kStyles, kClass, kSize, prefix, getClassSet } from '../../utils/kUtils';
import { State, DEFAULT, PRIMARY, Sizes } from '../../utils/styleMaps';

class Tag extends Component {
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
                closing: true
            });
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
        const { closable, children, color } = this.props;
        const { closed } = this.state;
        let classString = getClassSet(this.props);
        const tag = closed ? null : (
            <div className={classnames(classString)} style={{ background: color, color: color ? '#fff' : null }}>
                <span className="k-tag-text">{children}</span>
                {closable ? <Icon type="close" onClick={this.handleClose} /> : null}
            </div>
        )
        return (
            <Animate canBegin={this.state.closing} to={0} from={1}
                attributeName="opacity"
                onAnimationEnd={this.handleAnimateEnd}
                duration={300}>
                {tag}
            </Animate>
        )
    }
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(styles, DEFAULT,
    kSize([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
        kClass('k-tag', Tag)
    )
);