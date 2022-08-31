import React, {useState} from 'react';
import {useFormik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import style from '../../styles/auth/Auth.module.css';
import {RequestStatusType} from '../../store/reducers/app-reducer';
import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';

export type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

type AuthorizationPropsType = {
    isLoggedIn: boolean,
    onRegistrationSubmit: (values: any) => void,
    isLoad: RequestStatusType,
    isDisabled: boolean,
}

export const Registration: React.FC<AuthorizationPropsType> = ({
                                                                   isLoggedIn,
                                                                   onRegistrationSubmit,
                                                                   isLoad,
                                                                   isDisabled,
                                                               }) => {

    const [isVisibleEye, setVisibleEye] = useState({passEye: false, confirmEye: false});

    const handleClickShowPassword = () => {
        setVisibleEye({...isVisibleEye, passEye: !isVisibleEye.passEye});
        // @ts-ignore
        const x: HTMLInputElement | null = document.getElementById('password_1');

        if (x?.type) {
            if (x.type === 'password') {
                x.type = 'text';
                x.focus();
            } else {
                x.type = 'password';
                x.focus();
            }
        }
    };

    const handleClickShowConfirmPassword = () => {
        setVisibleEye({...isVisibleEye, confirmEye: !isVisibleEye.confirmEye});
        // @ts-ignore
        const x: HTMLInputElement | null = document.getElementById('password_2');

        if (x?.type) {
            if (x.type === 'password') {
                x.type = 'text';
                x.focus();
            } else {
                x.type = 'password';
                x.focus();
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Should be 7 symbol minimum';
            }
            if (values.password !== values.confirmPassword || !values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
            return errors;
        },
        onSubmit: values => {
            onRegistrationSubmit({email: values.email, password: values.password});
        },
    });

    const isBlockButton = Object.keys(formik.errors).length !== 0;

    if (isLoggedIn) return <Navigate to={'/profile'}/>;

    return <div className={style.main_block}>
        {isLoad === 'loading' && <Preloader/>}
        <h2>Sign up</h2>

        <form onSubmit={formik.handleSubmit} className={style.form_block}>
            <div className={style.form_block}>
                <div className={style.control_group}>
                    <input placeholder="Email" className={style.inputField} disabled={isDisabled}
                           {...formik.getFieldProps('email')}
                    />
                    <div className={style.errors}>
                        {formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>}
                    </div>

                    <div className={style.inputField}>
                        <input
                            className={style.inputField}
                            id="password_1"
                            placeholder="Enter password"
                            type={'password'}
                            {...formik.getFieldProps('password')}

                        />
                        <span className={style.passwordToggleIcon} onClick={handleClickShowPassword}>
                                      {isVisibleEye.passEye ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                        </span>

                    </div>

                    <div className={style.errors}>
                        {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                    </div>

                    <div className={style.inputField}>
                        <input
                            className={style.inputField}
                            id="password_2"
                            placeholder="Confirm password"
                            type={'password'}
                            {...formik.getFieldProps('confirmPassword')}

                        />
                        <span className={style.passwordToggleIcon} onClick={handleClickShowConfirmPassword}>
                                      {isVisibleEye.confirmEye ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                        </span>
                    </div>

                    <div className={style.errors}>
                        {formik.touched.password && formik.errors.confirmPassword &&
                            <span>{formik.errors.confirmPassword}</span>}
                    </div>

                    <button
                        className={style.auth_button}
                        type={'submit'}
                        color={'primary'}
                        disabled={isBlockButton || isDisabled}
                        children={'Register'}
                    />
                </div>
            </div>
        </form>

        <div className={style.opacity_text}>
            Already have an account?
        </div>

        <div>
            <NavLink className={style.sign_auth_link} to="/authorization">SIGN IN</NavLink>
        </div>

    </div>;
};