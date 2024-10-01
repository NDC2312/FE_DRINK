import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import styles from './SweetAlert2.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const error = (message) => {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: `${cx('sweet-alert-button')}`,
    });
};

export const success = (message) => {
    Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: `${cx('sweet-alert-button')}`,
    });
};
