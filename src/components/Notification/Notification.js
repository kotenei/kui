import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import omit from 'object.omit';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { guid, FirstChild } from '../../utils/kUtils';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: props.duration,
            notices: []
        }
    }
    static propTypes = {
        transitionName: PropTypes.string,
        component: PropTypes.node,
        style: PropTypes.object
    }
    static defaultProps = {
        transitionName: 'fade',
        component: null
    }
    add(noticeProps) {
        this.setState(prevState => {
            const notices = prevState.notices;
            if (!notices.find(notice => notice.key === noticeProps.key)) {
                notices.push(noticeProps);
                return {
                    notices,
                    duration: noticeProps.duration
                }
            };
        })
    }
    remove(key) {
        this.setState(prevState => {
            return {
                notices: prevState.notices.filter(notice => notice.key != key)
            }
        });
    }
    render() {
        const { transitionName, component: Component, className } = this.props;
        const { notices, duration } = this.state;

        if (!Component) {
            return null;
        }
        let nodes = notices.map((notice, i) => {
            const onClose = (key) => {
                this.remove(key);
                notice.onClose();
            };
            return (
                <CSSTransition
                    timeout={duration}
                    key={notice.key}
                    classNames={transitionName}
                    unmountOnExit={true}>
                    <Component {...notice} onClose={onClose.bind(this, notice.key)} />
                </CSSTransition>
            )
        });


        return (
            <div className={classnames('k-notification', className)} style={this.props.style}>
                <TransitionGroup >
                    {nodes}
                </TransitionGroup>
            </div>
        )
    }
}



Notification.newInstance = function (options = {}) {
    const { getContainer } = options;
    let props = omit(options, ['getContainer']);
    let div;
    if (getContainer) {
        div = getContainer();
    } else {
        div = document.createElement('div');
        document.body.appendChild(div);
    }

    const instance = ReactDOM.render(<Notification {...props} />, div);

    return {
        notice(noticeProps) {
            instance.add(noticeProps)
        },
        remove(key) {
            instance.remove(key)
        },
        destory() {
            ReactDOM.unmountComponentAtNode(div);
            if (!getContainer) {
                document.body.removeChild(div);
            }
        }
    }
}

export default Notification;