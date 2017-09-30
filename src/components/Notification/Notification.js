import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import omit from 'object.omit';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: props.duration,
            transitionLeave: true,
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
                    duration: noticeProps.duration,
                    transitionLeave: false
                }
            };
        })
    }
    remove(key) {
        this.setState(prevState => {
            return {
                notices: prevState.notices.filter(notice => notice.key != key),
                transitionLeave: true
            }
        });
    }
    render() {
        const { transitionName, component: Component, className } = this.props;
        const { notices, duration, transitionLeave } = this.state;

        if (!Component) {
            return null;
        }
        let nodes = notices.map(notice => {
            const onClose = (key) => {
                this.remove(key);
                notice.onClose();
            };
            return <Component {...notice} onClose={onClose.bind(this, notice.key)} />
        });

        return (
            <div className={classnames('k-notification', className)} style={this.props.style}>
                <CSSTransitionGroup
                    component="div"
                    transitionEnter={true}
                    transitionLeave={transitionLeave}
                    transitionName={transitionName}
                    transitionEnterTimeout={duration}
                    transitionLeaveTimeout={duration}
                >
                    {nodes}
                </CSSTransitionGroup>
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