import React from 'react';
import checkEmail from '../../../assets/img/checkEmail.svg';
import {Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import style from './CheckEmail.module.css';

const CheckEmail: React.FC = () => {
    return (
        <div className={style.checkEmailBlock}>
            <h2>Check Email</h2>
            <img src={checkEmail} alt=""/>
            <p>We’ve sent an Email with instructions to example@mail.com</p>
            <Button variant={'contained'} color={'primary'}>
                <NavLink to={'/authorization'}> Back to login</NavLink>
            </Button>
        </div>
    );
};

export default CheckEmail;