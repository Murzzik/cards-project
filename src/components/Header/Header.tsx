import React, { useState } from 'react';
import s from '../Header/Header.module.css';
import projectLogo from '../../assets/images/project-logo.png';
import { useAppSelector } from '../../store/store';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    const userName = useAppSelector(state => state.profile.name);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const userProfileAvatar = useAppSelector(state => state.profile.avatar);

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        console.log(isActive)
    };

    const dropdownMenu = isActive ? s.dropdownMenu : s.dropdownMenuActive

    const UserAuthStatus = isLoggedIn
        ?
        <>
            <span className={s.userName}>{userName}</span>
            <img src={userProfileAvatar} alt="USER PHOTO" className={s.userPhoto} />
        </>
        :
        <a href="#/authorization">
            <button className={s.loginBtn}>Log in</button>
        </a>;

    return (
        <div className={s.header}>
            <div className={s.dropdown}>
                <button className={s.navigationContainer} onClick={handleClick}>
                    <img src={projectLogo} alt="IT-INCUBATOR" />
                    <div className={dropdownMenu}>
                        <NavLink to="/authorization" className={s.navElement}>Authorization page</NavLink>
                        <NavLink to="/registration" className={s.navElement}>Registration page</NavLink>
                        <NavLink to="/profile" className={s.navElement}>Profile page</NavLink>
                    </div>
                </button>
            </div>
            <div className={s.userInfo}>
                {
                    UserAuthStatus
                }
            </div>
        </div>
    );
};