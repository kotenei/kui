import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import { CSSTransitionGroup } from 'react-transition-group';

class Messages extends Component {
    constructor(props) {
        super(props);

    }
    static propTypes = {

    }
    static defaultProps = {
    }
    state = {
        messages: [],
        duration: 1500,
        transitionLeave: true
    }
    add(msgProps) {
        this.setState(prevState => {
            const messages = prevState.messages;
            if (!messages.find(message => message.key === msgProps.key)) {
                const onClose = (key) => {
                    this.remove(key);
                    msgProps.onClose();
                };
                messages.push(<Message {...msgProps} onClose={onClose.bind(this, msgProps.key)} />);
                return {
                    messages,
                    duration: msgProps.duration,
                    transitionLeave: false
                }
            };
        })
    }
    remove(key) {
        this.setState(prevState => {
            return {
                messages: prevState.messages.filter(message => message.key != key),
                transitionLeave: true
            }
        });
    }
    render() {
        const { messages, duration, transitionLeave } = this.state;
        return (
            <CSSTransitionGroup
                component="div"
                transitionEnter={true}
                transitionLeave={transitionLeave}
                transitionName="message"
                transitionEnterTimeout={duration}
                transitionLeaveTimeout={duration}
            >
                {messages}
            </CSSTransitionGroup>
        )
    }
}

Messages.newInstance = function (options = {}) {
    const { getContainer, props } = options;
    let div;
    if (getContainer) {
        div = getContainer();
    } else {
        div = document.createElement('div');
        document.body.appendChild(div);
    }

    const instance = ReactDOM.render(<Messages {...props} />, div);

    return {
        notice(msgProps) {
            instance.add(msgProps)
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

export default Messages;