import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

class BreadcrumbItem extends Component {
    static propTypes = {
        icon: PropTypes.string,
        separator: PropTypes.string,
        to: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    }
    static defaultProps = {
        separator: '/'
    }
    renderIcon() {
        const { icon } = this.props;
        if (!icon) {
            return null;
        }
        return <Icon type={icon} />;
    }
    renderItem() {
        const { to, children } = this.props;
        let items = [];
        if (to) {
            items.push(<Link to={to}>{this.renderIcon()}<span>{children}</span></Link>);
        } else {
            items.push(this.renderIcon());
            items.push(<span >{children}</span>);
        }
        return items;
    }
    renderSeparator() {
        const { separator } = this.props;
        return <span className="separator">{separator}</span>;
    }
    render() {
        return (
            <li>
                {this.renderItem()}
                {this.renderSeparator()}
            </li>
        )
    }
}

export default BreadcrumbItem;