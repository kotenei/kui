import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Notice from './notice';
import { NotificationProps, NotificationState, NoticeProps } from './typing';

class Notification extends PureComponent<NotificationProps, NotificationState> {
  public static newInstance: any;

  public static defaultProps = {
    transitionName: 'fade',
  };

  constructor(props) {
    super(props);
    this.state = {
      notices: [],
    };
  }

  public render() {
    const { prefixCls = 'k-notification', className, transitionName } = this.props;
    const { notices } = this.state;
    const nodes = notices.map((notice, i) => {
      const onClose = key => {
        this.remove(key);
        if (notice.onClose) {
          notice.onClose();
        }
      };
      return (
        <CSSTransition timeout={300} key={notice.key} classNames={transitionName}>
          <Notice {...notice} onClose={onClose.bind(this, notice.key)} />
        </CSSTransition>
      );
    });

    const classString = classnames(prefixCls, className);

    return (
      <div className={classString}>
        <TransitionGroup component={React.Fragment}>{nodes}</TransitionGroup>
      </div>
    );
  }

  public add = (noticeProps: NoticeProps): void => {
    const { notices } = this.state;
    const newNotices = [...notices];
    const index = notices.findIndex(notice => notice.key === noticeProps.key);
    if (index < 0) {
      newNotices.push(noticeProps);
    } else {
      newNotices.splice(index, 1);
    }
    this.setState({
      notices: newNotices,
    });
  };

  public remove = key => {
    this.setState(prevState => {
      return {
        notices: prevState.notices.filter(notice => notice.key !== key),
      };
    });
  };
}

Notification.newInstance = (props: NotificationProps) => {
  let instance;
  const container = document.createElement('div');
  const handleRef = node => {
    instance = node;
  };
  document.body.appendChild(container);
  ReactDOM.render(<Notification {...props} ref={handleRef} />, container);

  return {
    notice(noticeProps: NoticeProps) {
      setTimeout(() => {
        instance && instance.add(noticeProps);
      });
    },
    remove(key) {
      instance && instance.remove(key);
    },
    destory() {
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    },
  };
};

export default Notification;
