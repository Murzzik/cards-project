import React from 'react';
import s from '../Header/Header.module.css';
import projectLogo from '../../assets/images/project-logo.png';
import userPhoto from '../../assets/images/userPhoto.png';

export const Header = () => {
    return (
        <div className={s.header}>
            <a href="/">
                <img src={projectLogo} alt="IT-INCUBATOR" />
            </a>
            <div className={s.userInfo}>
                <span className={s.userName}>Alex</span>
                <img src={userPhoto} alt="USER PHOTO" className={s.userPhoto} />
            </div>
        </div>
    );
};