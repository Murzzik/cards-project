import React from 'react';
import { NavLink } from 'react-router-dom';

import welcomePageLogo from '../../assets/images/welcomPageLogo.png';
import play_learn from '../../assets/images/play_learn_logo.png';

//@ts-ignore
import Zoom from 'react-reveal/Zoom';

import s from './WelcomePage.module.css';

export const WelcomePage = () => {
    return (
        <div className={s.wrapper}>
            <Zoom left>
                <div className={s.textContainer}>
                    <img src={play_learn} alt="" />
                    <div className={s.welcome_description}>
                        <p><span>!</span>The flash cards project was created in order to learn and keep your memory in good shape.</p>
                        <p><span>!</span>You can learn anything and anytime. At home, on the street, and even in transport.</p>
                    </div>
                    <div className={s.start_container}>
                        <NavLink to="/authorization">
                            <button className={s.welcome_btn_sign_in}>Sign in</button>
                        </NavLink>
                        <span>or</span>
                        <NavLink to="/registration">
                            <button className={s.welcome_btn_sign_up}>Sign up</button>
                        </NavLink>
                    </div>
                </div>
            </Zoom>
            <img src={welcomePageLogo} alt="" className={s.welcomeLogo} />
        </div>
    );
};