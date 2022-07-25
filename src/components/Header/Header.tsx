import React from 'react';
import s from '../Header/Header.module.css';
import projectLogo from '../../assets/images/project-logo.png';
import userPhoto from '../../assets/images/userPhoto.png';

interface HeaderType  {
    name: string
}

export const Header: React.FC<HeaderType> = ({name}) => {
    return (
        <div className={s.header}>
            <a href="/" className={s.headerIcon}>
                <img src={projectLogo} alt="IT-INCUBATOR"/>
            </a>
            <div className={s.userInfo}>
                <span className={s.userName}>{name}</span>
                <img src={userPhoto} alt="USER PHOTO" className={s.userPhoto} />
            </div>
        </div>
    );
};