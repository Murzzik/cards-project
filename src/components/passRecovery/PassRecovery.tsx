import React from 'react';
import {Button, FormControl, FormGroup, TextField} from '@material-ui/core';
import {useFormik} from 'formik';
import style from './PassRecovery.module.css';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {forgotPassword} from '../../store/reducers/authorization-reducer';
import Preloader from '../common/Preloader/Preloader';

type FormikErrorType = {
    email?: string,
}

export const PassRecovery = () => {
    const isLoad = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();
    const isAutoRedirect = useAppSelector(state => state.auth.isAutoRedirect);
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
                errors.email = 'Invalid email address';
            }

            return errors;

        },
        onSubmit: values => {
            // alert(JSON.stringify(values));
            dispatch(forgotPassword(values.email));
            formik.resetForm();
        }

    });
    if (isAutoRedirect) {
        return <Navigate to={'/check-email'}/>;
    }
    return (
        <div className={style.recoveryBlock}>
            {isLoad === 'loading' && <Preloader/>}
            <h2>Forgot your password?</h2>

            <form onSubmit={formik.handleSubmit}>
                <FormControl className={style.textField}>
                    <FormGroup>
                        <TextField label="Email"
                                   {...formik.getFieldProps('email')}
                        />
                        <div className={style.errors}>
                            {formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>}
                        </div>
                        <p>Enter your email address and we will send you further instructions </p>

                        <Button className={style.loginBtn} type={'submit'} variant={'contained'} color={'primary'}
                                disabled={Object.keys(formik.errors).length !== 0}
                        >
                            Send Instructions
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>

            <p>Did you remember your password?</p>
            <div className={style.signInLink}>
                <NavLink to={'/authorization'}>Try login in</NavLink>
            </div>
        </div>
    );
};