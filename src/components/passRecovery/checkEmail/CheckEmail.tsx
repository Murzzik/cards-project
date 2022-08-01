import React from 'react';
import checkEmail from '../../../assets/images/receiveEmail.png';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import style from '../../../styles/auth/Auth.module.css';

type CheckEmailPropsType = {
    recoveryEmail: string,
}

const CheckEmail: React.FC<CheckEmailPropsType> = ({ recoveryEmail }) => {
    return (
        <div className={style.main_block}>
            <h2>Check Email</h2>
            <img src={checkEmail} alt="" />
            <p className={style.opacity_text}>We’ve sent an Email with instructions to {recoveryEmail}</p>
            <NavLink to={'/authorization'}>
                <Button variant={'contained'} color={'primary'} className={style.auth_button}>
                    Back to login
                </Button>
            </NavLink>
        </div>
    );
};

export default CheckEmail;