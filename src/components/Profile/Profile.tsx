import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './Profile.module.css';
import editUserName from '../../assets/images/Edit.png';
import logout from '../../assets/images/logout.png';
import { BadgeAvatars } from '../../common/utils/BadgeAvatars';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUserInformationTC, updateUserNameTC } from '../../store/reducers/profile-reducer';
import {logoutTC, setIsLoggedIn} from '../../store/reducers/authorization-reducer';
import { Navigate } from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';

export const Profile = () => {

    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const userProfileName = useAppSelector(state => state.auth.user.name);
    const userProfileEmail = useAppSelector(state => state.auth.user.email);
    const isInitialized = useAppSelector(state => state.app.isInitialized);


    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(getUserInformationTC());
    // }, [dispatch]);

    const [editMode, setEditMode] = useState(false);
    const [userName, setUserName] = useState(userProfileName);


    const activateEditMode = () => {
        setEditMode(true);
    };

    const logoutHandler = () => {
        dispatch(logoutTC());
    };

    // Submit
    const submitUserName = () => {
        dispatch(updateUserNameTC(userName));
        setEditMode(false);
    };

    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        const userName = e.currentTarget.value;
        setUserName(userName);
    };

    const editModeForm = (
        editMode ?
            <TextField className={s.textField} id="standard-basic" label="Nickname" variant="standard" autoFocus
                       onChange={changeUserName} />
            :
            <span className={s.userProfileName}>{userProfileName}</span>
    );

    const editModeBtn = (
        editMode ?
            <button className={s.submitBtn} onClick={submitUserName}>Submit</button>
            :
            <div>
                <img src={editUserName} alt="Edit user name" onClick={activateEditMode} />
            </div>
    );


    if (!isInitialized) {
        return <Preloader/>;
    }

    if(!isLoggedIn) return <Navigate to={'/authorization'} />;
    return (
        <div className={s.container}>
            <div className={s.profileEdit}>
                <span className={s.profileHeader}>
                    Personal Information
                </span>
                <div className={s.badgeAvatar}>
                    <BadgeAvatars />
                </div>
                <div className={s.editUserName}>
                    {editModeForm}
                    <div className={s.editIcon}>
                        {editModeBtn}
                    </div>
                </div>
                <span className={s.userEmail}>
                    {userProfileEmail}
                </span>
                <div className={s.logoutContainer}>
                    <button className={s.logoutButton} onClick={logoutHandler}>
                        <img src={logout} alt="Logout button" />
                        <span className={s.buttonTitle}>
                            Log out
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};