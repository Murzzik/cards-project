import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './WelcomePage.module.css';
import { useAppSelector } from '../../store/store';

export const WelcomeBtnBlock = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);

    return (
        <div className={s.start_container}>
            {
                isLoggedIn ?
                    <NavLink to="/packs">
                        <button className={s.welcome_btn_continue}><span>Continue your education</span></button>
                    </NavLink>
                :
                    <>
                        <NavLink to="/authorization">
                            <button className={s.welcome_btn_sign_in}>Sign in</button>
                        </NavLink>
                        <span>or</span>
                        <NavLink to="/registration">
                            <button className={s.welcome_btn_sign_up}>Sign up</button>
                        </NavLink>
                    </>
            }
        </div>
    );
};