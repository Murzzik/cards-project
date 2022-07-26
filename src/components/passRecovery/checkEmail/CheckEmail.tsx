import React from 'react';
import checkEmail from '../../../assets/img/checkEmail.svg';
import {Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import style from '../../../styles/auth/Auth.module.css';
import {useAppSelector} from '../../../store/store';

const CheckEmail: React.FC = () => {
    const recoveryEmail = useAppSelector(state => state.auth.recoveryEmail);
    return (
        <div className={style.main_block}>
            <h2>Check Email</h2>
            <img src={checkEmail} alt=""/>
            <p className={style.opacity_text}>We’ve sent an Email with instructions to {recoveryEmail}</p>

            <NavLink to={'/authorization'} style={{width: '100%', textDecoration: 'none'}}>
                <Button variant={'contained'} color={'primary'} className={style.auth_button}>
                    Back to login
                </Button>
            </NavLink>
        </div>
    );
};

export default CheckEmail;