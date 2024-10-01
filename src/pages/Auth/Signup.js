// import classNames from 'classnames/bind';
// import styles from './Auth.module.scss';
// import { Button } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { logo } from '~/utils/imageHome';
// import googleLogo from '~/assets/SignIn/google.svg';
// import config from '~/config';

// const cx = classNames.bind(styles);

// function Signup() {
//     const navigate = useNavigate();

//     return (
//         <>
//             <div className={cx('wrapper')}>

//                 <div className={cx('login')}>
//                     <div className={cx('header')}>
//                         <img src={logo} alt="" />
//                         <h4>Đăng nhập hoặc tạo tài khoản</h4>
//                     </div>
//                     <div className={cx('body')}>
//                         <div className={cx('top')} onClick={handleGGLogin}>
//                             <img src={googleLogo} alt="google" />
//                             <span className={cx('btn-google')}>Tiếp tục với Google</span>
//                         </div>
//                         <form className={cx('form')} onSubmit={formik.handleSubmit}>
//                             <label className={cx('label-auth')}>Tên của bạn</label>
//                             <input
//                                 placeholder="Nhập tên của bạn"
//                                 name="name"
//                                 type="text"
//                                 onChange={formik.handleChange}
//                                 value={formik.values.name}
//                                 className={cx('input-auth')}
//                             />
//                             {formik.errors.name ? <div className={cx('error')}>{formik.errors.name}</div> : null}

//                             <label className={cx('label-auth')}>Email</label>
//                             <input
//                                 placeholder="Nhập email của bạn"
//                                 name="email"
//                                 type="email"
//                                 onChange={formik.handleChange}
//                                 value={formik.values.email}
//                                 className={cx('input-auth')}
//                             />
//                             {formik.errors.email ? <div className={cx('error')}>{formik.errors.email}</div> : null}

//                             <label className={cx('label-auth')}>Mật khẩu</label>
//                             <input
//                                 placeholder="Nhập mật khẩu"
//                                 name="password"
//                                 type="password"
//                                 className={cx('input-auth')}
//                                 onChange={formik.handleChange}
//                                 value={formik.values.password}
//                             />
//                             {formik.errors.password ? (
//                                 <div className={cx('error')}>{formik.errors.password}</div>
//                             ) : null}
//                             <label className={cx('label-auth')}>Nhập lại mật khẩu</label>
//                             <input
//                                 placeholder="Nhập lại mật khẩu"
//                                 name="confirmedPassword"
//                                 onChange={formik.handleChange}
//                                 value={formik.values.confirmedPassword}
//                                 type="password"
//                                 className={cx('input-auth')}
//                             />
//                             {formik.errors.confirmedPassword ? (
//                                 <div className={cx('error')}>{formik.errors.confirmedPassword}</div>
//                             ) : null}
//                             <Button
//                                 type="submit"
//                                 variant="outlined"
//                                 size="medium"
//                                 sx={{
//                                     color: 'var(--white)',
//                                     background: 'var(--background)',
//                                     fontSize: '1.2rem',
//                                     border: '1px solid var(--background)',
//                                     marginTop: '5px',
//                                     marginBottom: '15px',

//                                     '&:hover': {
//                                         color: 'var(--white)',
//                                         background: 'var(--background)',
//                                     },
//                                 }}
//                             >
//                                 Đăng nhập
//                             </Button>
//                         </form>
//                         <p className={cx('no-account')}>
//                             Bạn đã có tài khoản<Link to="/signin">Đăng nhập</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Signup;
