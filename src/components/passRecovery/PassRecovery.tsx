import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';
import style from './PassRecovery.module.css';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/store';
import Preloader from '../common/Preloader/Preloader';
import {forgotPassword} from '../../store/reducers/authorization-reducer';

export const PassRecovery = () => {
    const isLoad = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();
    const isAutoRedirect = useAppSelector(state => state.auth.isAutoRedirect);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        setEmail(value);
        if (correctEmail(value)) {
            setError('Invalid email');
        } else {
            setError('');
        }
    };

    const onClickHandler = () => {
        dispatch(forgotPassword(email));
    };

    function correctEmail(value: string) {
        return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value));
    }

    if (isAutoRedirect) {
        return <Navigate to={'/check-email'}/>;
    }

    const blockBtn = correctEmail(email);
    return (
        <div className={style.recoveryBlock}>
            {isLoad === 'loading' && <Preloader/>}
            <h2>Forgot your password?</h2>

            <TextField className={style.textField} onChange={onChangeHandler} label="email" value={email} type="email"/>
            <div className={style.errors}>
                <span>{error}</span>
            </div>
            <p>Did you remember your password?</p>
            <div className={style.signInLink}>
                <NavLink to={'/authorization'}>Try login in</NavLink>
            </div>
            <Button className={style.loginBtn} type={'submit'} variant={'contained'} color={'primary'} onClick={onClickHandler} disabled={blockBtn}>
                Send Instructions
            </Button>
        </div>
    );
};