import React from 'react';
import {useFormik} from 'formik';
import {Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, TextField} from '@material-ui/core';
import {Navigate, NavLink} from 'react-router-dom';
import {Visibility, VisibilityOff} from '@material-ui/icons/';
import Preloader from '../common/Preloader/Preloader';
import style from '../../styles/auth/Auth.module.css';
import {RequestStatusType} from '../../store/reducers/app-reducer';

export type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

interface State {
    password: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
}

type AuthorizationPropsType = {
    isLoggedIn: boolean,
    onRegistrationSubmit: (values: any) => void,
    isLoad: RequestStatusType,
    isDisabled: boolean,
}

export const Registration: React.FC<AuthorizationPropsType> = ({isLoggedIn, onRegistrationSubmit, isLoad, isDisabled}) => {

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
        showConfirmPassword: false
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
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
        }
    });

    const isBlockButton = Object.keys(formik.errors).length !== 0;

    if (isLoggedIn) return <Navigate to={'/profile'}/>;

    return <div className={style.main_block}>
        {isLoad === 'loading' && <Preloader/>}
        <h2>Sign up</h2>

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
                            id="standard-adornment-password1"
                            disabled={isDisabled}
                            type={values.showPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        style={{backgroundColor: 'transparent'}}
                                        disableRipple={true}
                                    >
                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <div className={style.errors}>
                        {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                    </div>

                    <FormControl variant="standard" className={style.input_field}>
                        <InputLabel htmlFor="standard-adornment-password2">Confirm password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            disabled={isDisabled}
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        // onMouseDown={handleClickShowConfirmPassword}
                                        style={{backgroundColor: 'transparent'}}
                                        disableRipple={true}
                                    >
                                        {values.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <div className={style.errors}>
                        {formik.touched.password && formik.errors.confirmPassword &&
                            <span>{formik.errors.confirmPassword}</span>}
                    </div>

                    <Button
                        className={style.auth_button}
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        disabled={isBlockButton || isDisabled}
                        children={'Register'}
                    />
                </FormGroup>
            </FormControl>
        </form>

        <div className={style.opacity_text}>
            Already have an account?
        </div>

        <div>
            <NavLink className={style.sign_auth_link} to="/authorization">SIGN IN</NavLink>
        </div>

    </div>;
};