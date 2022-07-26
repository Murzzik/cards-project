import React, { useEffect } from 'react';
import s from '../Header/Header.module.css';
import projectLogo from '../../assets/images/project-logo.png';
import userPhoto from '../../assets/images/userPhoto.png';
import { useAppSelector } from '../../store/store';
import { cardsAPI } from '../../api/cards-api';
import { useDispatch } from 'react-redux';
import { updateUserNameAC } from '../../store/reducers/profile-reducer';

export const Header = () => {
    const dispatch = useDispatch()
    const userName = useAppSelector(state => state.profile.name)

    useEffect(() => {
        cardsAPI.getUserInfo().then((res) =>{
            dispatch(updateUserNameAC(res.data.name))
        })
    })

    console.log('error')

    return (
        <div className={s.header}>
            <a href="/" className={s.headerIcon}>
                <img src={projectLogo} alt="IT-INCUBATOR"/>
            </a>
            <div className={s.userInfo}>
                <span className={s.userName}>{userName}</span>
                <img src={userPhoto} alt="USER PHOTO" className={s.userPhoto} />
            </div>
        </div>
    );
};