import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Profile.module.css';
import editUserName from '../../assets/images/Edit.png';
import logout from '../../assets/images/logout.png';
import {BadgeAvatars} from '../common/BadgeAvatars/BadgeAvatars';
import {TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {Navigate} from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import {authorizationUser, logOut, updateUserData} from '../../store/reducers/authorizationReducer';

export const Profile = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const userProfileName = useAppSelector(state => state.auth.user.name);
    const userProfileEmail = useAppSelector(state => state.auth.user.email);
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const isLoading = useAppSelector(state => state.app.status);
    const userProfileAvatar = useAppSelector(state => state.auth.user.avatar) as string;

    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [userName, setUserName] = useState(userProfileName);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

    // if (!userProfileName) {
    //     dispatch(authorizationUser());
    // }

    useEffect(() => {
        if (!userProfileName) {
            dispatch(authorizationUser());
        }
    }, [userProfileName]);
    const activateEditMode = () => {
        setEditMode(true);
    };

    const logoutHandler = () => {
        dispatch(logOut());
    };

    // Submit
    const submitUserName = () => {
        dispatch(updateUserData({name: userName, avatar: userProfileAvatar}));
        setEditMode(false);
    };

    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        const userName = e.currentTarget.value;
        if (userName.length <= 1) {
            setErrorMessage('Your nickname should include at least one symbol.');
            setSubmitBtnDisabled(true);
        } else if (userName.length > 16) {
            setErrorMessage('Your nickname must contain no more than 16 characters.');
            setSubmitBtnDisabled(true);
        } else {
            setSubmitBtnDisabled(false);
            setErrorMessage('');
            setUserName(userName);
        }
    };

    const editModeForm = (
        editMode ?
            <TextField className={s.textField} id="standard-basic" label="Nickname" variant="standard" autoFocus
                       onChange={changeUserName} autoComplete="off" color="info"/>
            :
            <span className={s.userProfileName}>{userProfileName}</span>
    );

    const editModeBtn = (
        editMode ?
            <button className={s.submitBtn} onClick={submitUserName} disabled={submitBtnDisabled}>Submit</button>
            :
            <div>
                <img src={editUserName} alt="Edit user name" onClick={activateEditMode}/>
            </div>
    );

    if (!isInitialized) {
        return <Preloader/>;
    }

    if (!isLoggedIn) return <Navigate to={'/authorization'}/>;
    return (
        <div>
            {isLoading==='loading' && <Preloader/>}
            <div className={s.container}>
                <div className={s.profileEdit}>
                <span className={s.profileHeader}>
                    Personal Information
                </span>
                    <div className={s.badgeAvatar}>
                        <BadgeAvatars/>
                    </div>
                    <div className={s.editUserName}>
                        {editModeForm}
                        <div className={s.editIcon}>
                            {editModeBtn}
                        </div>
                    </div>
                    <span className={s.errorMessage}>{errorMessage}</span>
                    <span className={s.userEmail}>
                    {userProfileEmail}
                </span>
                    <div className={s.logoutContainer}>
                        <button className={s.logoutButton} onClick={logoutHandler}>
                            <img src={logout} alt="Logout button"/>
                            <span className={s.buttonTitle}>
                            Log out
                        </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};