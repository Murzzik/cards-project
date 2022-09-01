import React, { useEffect } from 'react';

import welcomePageLogo from '../../assets/images/welcomPageLogo.png';
import play_learn from '../../assets/images/play_learn_logo.png';

//@ts-ignore
import Zoom from 'react-reveal/Zoom';
import s from './WelcomePage.module.css';
import { WelcomeBtnBlock } from './WelcomeBtnBlock';
import { authorizationUser } from '../../store/reducers/authorizationReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Preloader from '../common/Preloader/Preloader';


export const WelcomePage = () => {
    const dispatch = useAppDispatch();
    const userProfileName = useAppSelector(state => state.auth.user.name);
    const isLoading = useAppSelector(state => state.app.status) === 'loading';

    useEffect(() => {
        if (!userProfileName) {
            dispatch(authorizationUser());
        }
    }, []);

    return (
        <div className={s.wrapper}>
            {isLoading && <Preloader/>}
            <Zoom left>
                <div className={s.textContainer}>
                    <img src={play_learn} alt="" />
                    <div className={s.welcome_description}>
                        <p><span>⭐</span>The flash cards project was created in order to learn and keep your memory in
                            good shape.</p>
                        <p><span>⭐</span>You can learn anything and anytime. At home, on the street, and even in
                            transport.</p>
                    </div>
                    <WelcomeBtnBlock />
                </div>
            </Zoom>
            <img src={welcomePageLogo} alt="" className={s.welcomeLogo} />
        </div>
    );
};