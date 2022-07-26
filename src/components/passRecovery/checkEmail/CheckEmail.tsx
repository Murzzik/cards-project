import React from 'react';
import checkEmail from '../../../assets/img/checkEmail.svg';
import {Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import style from '../../../styles/auth/Auth.module.css';
import Preloader from '../../common/Preloader/Preloader';
import {useAppSelector} from '../../../store/store';

const CheckEmail: React.FC = () => {
    const isLoad = useAppSelector(state => state.app.status);
    return (
        <div className={style.main_block}>
            {isLoad === 'loading' && <Preloader/>}
            <h2>Check Email</h2>
            <img src={checkEmail} alt=""/>
            <p className={style.opacity_text}>We’ve sent an Email with instructions to example@mail.com</p>

            <NavLink to={'/authorization'} style={{width: '100%', textDecoration: 'none'}}>
                <Button variant={'contained'} color={'primary'} className={style.auth_button}>
                    Back to login
                </Button>
            </NavLink>
        </div>
    );
};

export default CheckEmail;