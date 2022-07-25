import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel, TextField} from '@material-ui/core';
import style from './authorization.module.css';
import {Navigate, NavLink} from 'react-router-dom';
import {Visibility, VisibilityOff} from '@material-ui/icons/';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {login, setIsAutoRedirect} from '../../store/reducers/authorization-reducer';
import Preloader from '../common/Preloader/Preloader';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

interface State {
    password: string;
    showPassword: boolean;
}

export const Authorization = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
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
            rememberMe: true
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
            // alert(JSON.stringify(values));
            dispatch(login(values));
            formik.resetForm();
        }
    });

    const isLoad = useAppSelector(state => state.app.status);

    useEffect(() => {
        dispatch(setIsAutoRedirect(false));
    }, [dispatch]);

    if (isLoggedIn) return <Navigate to={'/profile'}/>;
    return <div className={style.loginBlock}>
        {isLoad === 'loading' && <Preloader/>}
        <h2>Sign in</h2>

        <form onSubmit={formik.handleSubmit} className={style.formBlock}>
            <FormControl className={style.controlGroup}>
                <FormGroup>
                    <TextField label="Email" className={style.textField}
                               {...formik.getFieldProps('email')}
                    />
                    <div className={style.errors}>
                        {formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>}
                    </div>

                    <FormControl variant="standard" className={style.textField}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            // value={values.password}
                            // onChange={handleChange('password')}
                            {...formik.getFieldProps('password')}
                            endAdornment={
                                <InputAdornment position="end" className={style.visibilityIcon}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        style={{backgroundColor: 'transparent'}}
                                        disableRipple={true}
                                    >
                                        {values.showPassword ? <VisibilityOff className={style.visibilityIcon}/> : <Visibility className={style.visibilityIcon}/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>


                    <div className={style.errors}>
                        {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                    </div>


                    <div className={style.forgotPass}>
                        <NavLink to={'/passrecovery'}>Forgot password</NavLink>
                    </div>

                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox
                            className={style.checkRememberMe}
                            style={{color: '#366EFF'}}
                            {...formik.getFieldProps('rememberMe')}
                            checked={formik.values.rememberMe}
                        />}/>


                    <Button className={style.loginBtn} type={'submit'} variant={'contained'} color={'primary'}
                        // disabled={Object.keys(formik.errors).length !== 0}
                    >
                        SIGN IN
                    </Button>

                    <p>Don’t have an account?</p>

                    <div className={style.signUpLink}>
                        <NavLink to={'/registration'}>SING UP</NavLink>
                    </div>
                </FormGroup>
            </FormControl>
        </form>
    </div>;
};