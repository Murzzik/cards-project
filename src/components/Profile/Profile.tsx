import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './Profile.module.css';
import editUserName from '../../assets/images/Edit.png';
import logout from '../../assets/images/logout.png';
import { BadgeAvatars } from '../../common/utils/BadgeAvatars';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { updateUserNameAC, updateUserNameTC } from '../../store/reducers/profile-reducer';
import { authAPI } from '../../api/cardsApi';

export const Profile = () => {

    useEffect(() => {
        authAPI.getUserInfo().then((res) =>{
            dispatch(updateUserNameAC(res.data.name))
        })
    }, [])

    const userProfileName = useAppSelector<string>(state => state.profile.name);
    const userEmail = useAppSelector(state => state.auth)

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
        const userName = e.currentTarget.value
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
                    mcalexstar@gmail.com
                </span>
                <div className={s.logoutContainer}>
                    <button className={s.logoutButton} >
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