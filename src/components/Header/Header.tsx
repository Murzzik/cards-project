import React, { useState } from 'react';
import s from '../Header/Header.module.css';
import projectLogo from '../../assets/images/project-logo.png';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { NavLink } from 'react-router-dom';
import logout from '../../assets/images/logout.png';
import { logOut } from '../../store/reducers/authorization-reducer';

export const Header = () => {
    const userName = useAppSelector(state => state.auth.user.name);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const userProfileAvatar = useAppSelector(state => state.auth.user.avatar);

    const dispatch = useAppDispatch();

    const [isActiveNavigate, setIsActiveNavigate] = useState(true);
    const [isActiveProfile, setIsActiveProfile] = useState(true);

    const logoutHandler = () => {
        dispatch(logOut());
        setIsActiveProfile(true);
    };

    const dropdownNavigateHandler = () => {
        setIsActiveNavigate(!isActiveNavigate);
    };

    const dropdownProfileHandler = () => {
        setIsActiveProfile(!isActiveProfile);
    };

    const dropdownMenu = isActiveNavigate ? s.dropdownMenu : s.dropdownMenuActive;
    const dropdownProfile = isActiveProfile ? s.dropdownProfile : s.dropdownProfileActive;

    const UserAuthStatus = isLoggedIn
        ?
        <>
            <span className={s.userName}>{userName}</span>
            <img src={userProfileAvatar} alt="USER PHOTO" className={s.userPhoto} onClick={dropdownProfileHandler} />
        </>
        :
        <a href="#/authorization">
            <button className={s.signInBtn}>Sign in</button>
        </a>;

    return (
        <div className={s.header}>
            <div className={s.dropdown}>
                <button className={s.navigationContainer} onClick={dropdownNavigateHandler}>
                    <img src={projectLogo} alt="IT-INCUBATOR" />
                    <div className={dropdownMenu}>
                        <NavLink to="/" className={s.navElement}>Main page</NavLink>
                        <NavLink to="/authorization" className={s.navElement}>Authorization page</NavLink>
                        <NavLink to="/registration" className={s.navElement}>Registration page</NavLink>
                        <NavLink to="/packs" className={s.navElement}>Packs page</NavLink>
                        <NavLink to="/profile" className={s.navElement}>Profile page</NavLink>
                    </div>
                </button>
            </div>
            <div className={s.dropdown}>
                <div className={s.userInfo}>
                    {UserAuthStatus}
                    <div className={dropdownProfile}>
                        <NavLink to="/profile" className={s.navProfileElement}>Profile page</NavLink>
                        <div className={s.navProfileElement} onClick={logoutHandler}>
                            <img src={logout} alt="Logout button" className={s.logoutIcon} />
                            <span>Log out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};