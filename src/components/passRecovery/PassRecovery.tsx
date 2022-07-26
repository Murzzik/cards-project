import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';
import style from '../../styles/auth/Auth.module.css';
import {NavLink} from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import {RequestStatusType} from '../../store/reducers/app-reducer';

type PassRecoveryPropsType = {
    isLoad: RequestStatusType,
    repairPassword: (email: string) => void,
}

export const PassRecovery: React.FC<PassRecoveryPropsType> = ({isLoad, repairPassword}) => {

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
        repairPassword(email);
    };

    function correctEmail(value: string) {
        return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value));
    }

    const blockBtn = correctEmail(email);
    return (
        <div className={style.main_block}>
            {isLoad === 'loading' && <Preloader/>}
            <h2>Forgot your password?</h2>
            <TextField className={style.input_field} onChange={onChangeHandler} label="Email" value={email} type="email" name="email"/>
            <div className={style.errors}>
                <span>{error}</span>
            </div>
            <p className={style.opacity_text}>Did you remember your password?</p>
            <NavLink className={style.sign_auth_link} to={'/authorization'}>Try login in</NavLink>
            <Button className={style.auth_button} type={'submit'} variant={'contained'} color={'primary'} onClick={onClickHandler} disabled={blockBtn}>
                Send Instructions
            </Button>
        </div>
    );
};