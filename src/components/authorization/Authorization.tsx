import React, {useState} from 'react';
import {useFormik} from 'formik';
import {NavLink} from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import style from '../../styles/auth/Auth.module.css';
import {RequestStatusType} from '../../store/reducers/app-reducer';
import {SuperCheckbox} from '../SuperComponents/SuperCheckbox/SuperCheckbox';
import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

type AuthorizationPropsType = {
    isLoggedIn: boolean,
    authorization: (values: FormikErrorType) => void,
    isLoad: RequestStatusType,
    isDisabled: boolean
}

export const Authorization: React.FC<AuthorizationPropsType> = ({isLoggedIn, authorization, isLoad, isDisabled}) => {
    const [isVisible, setVisible] = useState(false);
    const changePass = () => {
        setVisible(!isVisible);

        // @ts-ignore
        const x: HTMLInputElement | null = document.getElementById('myPassInput');

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
            rememberMe: true,
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
            return errors;
        },
        onSubmit: values => {
            authorization(values);
            // formik.resetForm(); Предотвращение дублирования параметров входа.
        },
    });

    const isBlockButton = Object.keys(formik.errors).length !== 0;

    return <div className={style.main_block}>
        {isLoad === 'loading' && <Preloader/>}
        <h2>Sign in</h2>

        <form onSubmit={formik.handleSubmit} className={style.form_block}>
            <div className={style.form_block}>
                <div className={style.control_group}>
                    <input className={style.inputField} disabled={isDisabled} placeholder="Email"
                           {...formik.getFieldProps('email')}/>
                    <div className={style.errors}>
                        {formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>}
                    </div>

                    <div className={style.passwordBlock}>
                        <input
                            className={style.inputField}
                            id="myPassInput"
                            placeholder="Enter password"
                            type={'password'}
                            {...formik.getFieldProps('password')}

                        />
                        <span className={style.passwordToggleIcon} onClick={changePass}>
                                      {isVisible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                        </span>
                    </div>


                    <div className={style.errors}>
                        {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                    </div>

                    <div style={{width: '100%', textAlign: 'right'}}>
                        <NavLink className={style.forgot_password} to={'/passrecovery'}>
                            <span className={style.forgot_title}>Forgot password</span>
                        </NavLink>
                    </div>


                    <div style={{display: 'flex'}}>
                        <SuperCheckbox
                            className={style.rememberMe_checkbox}
                            {...formik.getFieldProps('Remember Me')}
                            checked={formik.values.rememberMe}
                        />
                        <span>rememberMe</span>
                    </div>


                    <button className={style.auth_button} type={'submit'} color={'primary'}
                            disabled={isDisabled || isBlockButton}
                    >
                        SIGN IN
                    </button>

                    <p className={style.opacity_text}>Don’t have an account?</p>

                    <div style={{width: '100%', textAlign: 'center'}}>
                        <NavLink className={style.sign_auth_link} to={'/registration'}>SING UP</NavLink>
                    </div>

                </div>
            </div>
        </form>
    </div>;
};