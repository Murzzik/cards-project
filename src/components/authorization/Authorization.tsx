import React from 'react';
import {useFormik} from 'formik';
import {Button, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel, TextField,} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import {Visibility, VisibilityOff} from '@material-ui/icons/';
import Preloader from '../common/Preloader/Preloader';
import style from '../../styles/auth/Auth.module.css';
import {RequestStatusType} from '../../store/reducers/app-reducer';
import {SuperCheckbox} from '../SuperComponents/SuperCheckbox/SuperCheckbox';

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

interface State {
    password: string;
    showPassword: boolean;
}

type AuthorizationPropsType = {
    isLoggedIn: boolean,
    authorization: (values: FormikErrorType) => void,
    isLoad: RequestStatusType,
    isDisabled: boolean
}

export const Authorization: React.FC<AuthorizationPropsType> = ({isLoggedIn, authorization, isLoad, isDisabled}) => {

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true,
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if(!values.email) {
                errors.email = 'Required';
            } else if((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
                errors.email = 'Invalid email address';
            }
            if(!values.password) {
                errors.password = 'Required';
            } else if(values.password.length < 7) {
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
        {isLoad === 'loading' && <Preloader />}
        <h2>Sign in</h2>

        <form onSubmit={formik.handleSubmit} className={style.form_block}>
            <FormControl className={style.form_block}>
                <FormGroup className={style.control_group}>
                    <TextField label="Email" className={style.input_field} disabled={isDisabled}
                               {...formik.getFieldProps('email')}
                    />
                    <div className={style.errors}>
                        {formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>}
                    </div>

                    <FormControl variant="standard" className={style.input_field}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            disabled={isDisabled}
                            type={values.showPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        className={style.showPasswordBtn}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        disableRipple={true}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <div className={style.errors}>
                        {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                    </div>

                    <NavLink className={style.forgot_password} to={'/passrecovery'}>
                        <span className={style.forgot_title}>Forgot password</span>
                    </NavLink>

                    <FormControlLabel
                        className={style.rememberMe_container}
                        label={'Remember me'}
                        control={<SuperCheckbox
                            className={style.rememberMe_checkbox}
                            {...formik.getFieldProps('rememberMe')}
                            checked={formik.values.rememberMe}
                        />} />

                    <Button className={style.auth_button} type={'submit'} variant={'contained'} color={'primary'}
                            disabled={isDisabled || isBlockButton}
                    >
                        SIGN IN
                    </Button>

                    <p className={style.opacity_text}>Don’t have an account?</p>

                    <NavLink className={style.sign_auth_link} to={'/registration'}>SING UP</NavLink>

                </FormGroup>
            </FormControl>
        </form>
    </div>;
};