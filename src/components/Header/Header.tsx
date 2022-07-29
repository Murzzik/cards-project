import React, {useEffect} from 'react';
import s from '../Header/Header.module.css';
import projectLogo from '../../assets/images/project-logo.png';
import userPhoto from '../../assets/images/userPhoto.png';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getUserInformationTC} from '../../store/reducers/profile-reducer';

export const Header = () => {
    const userName = useAppSelector(state => state.auth.user.name);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(getUserInformationTC());
    // }, [dispatch]);


    const UserAuthStatus = isLoggedIn
        ?
        <>
            <span className={s.userName}>{userName}</span>
            <img src={userPhoto} alt="USER PHOTO" className={s.userPhoto} />
        </>
        :
        <a href="#/authorization">
            <button className={s.loginBtn}>Log in</button>
        </a>;

    return (
        <div className={s.header}>
            <a href="/" className={s.headerIcon}>
                <img src={projectLogo} alt="IT-INCUBATOR" />
            </a>
            <div className={s.userInfo}>
                {
                    UserAuthStatus
                }
            </div>
        </div>
    );
};