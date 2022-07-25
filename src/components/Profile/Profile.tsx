import React, { ChangeEvent, useState } from 'react';
import s from './Profile.module.css';
import { Header } from '../Header/Header';
import editUserName from '../../assets/images/Edit.png';
import logout from '../../assets/images/logout.png';
import { BadgeAvatars } from '../../common/utils/BadgeAvatars';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { updateUserNameTC } from '../../store/reducers/profile-reducer';

export const Profile = () => {
    const userProfileName = useAppSelector<string>(state => state.profile.name);

    const [editMode, setEditMode] = useState(false);
    const [userName, setUserName] = useState(userProfileName);

    const dispatch = useAppDispatch();

    const activateEditMode = () => {
        setEditMode(true);
    };

    // Submit
    const submitUserName = () => {
        dispatch(updateUserNameTC(userName));
        setEditMode(false);
    };

    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        let userName = e.currentTarget.value;
        setUserName(userName);
    };

    const editModeForm = (
        editMode ?
            <TextField className={s.textField} id="standard-basic" label="Nickname" variant="standard" autoFocus
                       onChange={changeUserName} />
            :
            <span className={s.userProfileName}>{userName}</span>
    );

    const editModeBtn = (
        editMode ?
            <button className={s.submitBtn} onClick={submitUserName}>Submit</button>
            :
            <div>
                <img src={editUserName} alt="Edit user name" onClick={activateEditMode} />
            </div>
    );

    return (
        <div className={s.container}>
            <Header name={userName} />
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
                    mcalexstar@gmail.com
                </span>
                <div className={s.logoutContainer}>
                    <button className={s.logoutButton}>
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