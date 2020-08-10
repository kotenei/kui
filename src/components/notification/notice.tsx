import React, { PureComponent, Children } from 'react';
import classnames from 'classnames';
import { NoticeProps } from './typing';

class Notice extends PureComponent<NoticeProps> {
  public static defaultProps = {
    duration: 1500,
  };

  private timer: any = null;

  public componentDidMount() {
    this.startCloseTimer();
  }

  public render() {
    const { content } = this.props;
    return (
      content &&
      React.cloneElement(content, {
        ...content.props,
        onMouseEnter: this.clearCloseTimer,
        onMouseLeave: this.startCloseTimer,
        onClose: this.close,
      })
    );
  }

  private clearCloseTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  private startCloseTimer = () => {
    const { duration } = this.props;
    if (duration) {
      this.timer = setTimeout(() => {
        this.close();
      }, duration);
    }
  };

  private close = () => {
    const { onClose } = this.props;
    this.clearCloseTimer();
    if (onClose) {
      onClose();
    }
  };
}

export default Notice;
