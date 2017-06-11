import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Card extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        bodyStyle: PropTypes.object,
        bordered: PropTypes.bool
    }
    static defaultProps = {
        bordered: false
    }
    render() {
        const { title, extra, bodyStyle, bordered } = this.props;
        let prefix = 'k-card';

        return (
            <div >
                <div ></div>
                <div ></div>
            </div>
        )
    }
}

export default Card;