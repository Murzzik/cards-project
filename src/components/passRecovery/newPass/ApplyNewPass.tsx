import React, {ChangeEvent, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';
import style from './ApplyNewPass.module.css';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {createNewPassword} from '../../../store/reducers/authorization-reducer';
import Preloader from '../../common/Preloader/Preloader';

export const ApplyNewPass = () => {
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    let {token} = useParams();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let password = e.currentTarget.value;
        setPassword(password);
        if (correctPassword(password)) {
            setError('Minimum 7 symbols');
        } else {
            setError('');
        }
    };

    function correctPassword(name: string) {
        return name.length < 7;
    }

    const onClickHandler = () => {
        dispatch(createNewPassword(password, token));
        setPassword('');
    };
    const isLoad = useAppSelector(state => state.app.status);
    const blockBtn = correctPassword(password);
    return (
        <div className={style.newPasswordBlock}>
            {isLoad === 'loading' && <Preloader/>}
            <h3>Create new Password</h3>
            <TextField className={style.textField} onChange={onChangeHandler} label="password" value={password}/>
            <div className={style.errors}>
                <span>{error}</span>
            </div>
            <p> Create new password and we will send you further instructions to email </p>
            <Button className={style.loginBtn} variant={'contained'} color={'primary'} onClick={onClickHandler} disabled={blockBtn}>
                <NavLink to={'/authorization'}> Create new password</NavLink>
            </Button>
        </div>
    );
};
