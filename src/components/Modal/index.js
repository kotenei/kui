import Modal from './Modal';
import confirm from './confirm';

Modal.info = function (props) {
    const config = {
        type: 'info',
        iconType: 'infocirlce',
        okCancel: false,
        ...props
    }
    return confirm(config);
};

Modal.success = function (props) {
    const config = {
        type: 'success',
        iconType: 'checkcircle',
        okCancel: false,
        ...props
    }
    return confirm(config);
};

Modal.warning = function (props) {
    const config = {
        type: 'warning',
        iconType: 'exclamationcircle',
        okCancel: false,
        ...props
    }
    return confirm(config);
};

Modal.error = function (props) {
    const config = {
        type: 'danger',
        iconType: 'closecircle',
        okCancel: false,
        ...props
    }
    return confirm(config);
};

Modal.confirm = function (props) {
    const config = {
        type: 'warning',
        iconType: 'questioncircle',
        ...props
    }
    return confirm(config);
};


export default Modal;