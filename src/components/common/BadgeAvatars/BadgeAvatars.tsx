import {Badge} from '@mui/material';
import editPhoto from '../../../assets/images/changePhoto.png';
import s from './BadgeAvatars.module.css';
import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {uploadPhoto} from '../../../utils/uploadPhoto';
import {updateUserData} from '../../../store/reducers/authorizationReducer';
import userDefaultPhoto from '../../../assets/images/icons8-user-100.png';

export const BadgeAvatars = () => {

    const userProfileAvatar = useAppSelector(state => state.auth.user.avatar);
    const dispatch = useAppDispatch();

    const userPhoto = (userProfileAvatar && userProfileAvatar.includes('data:image')) ?
        <img className={s.userPhoto} src={userProfileAvatar} alt="Personal user avatar"/>
        :
        <img className={s.userPhoto} src={userDefaultPhoto} alt="Default user avatar"/>;

    const uploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        uploadPhoto(e, (file64: string) => {
            dispatch(updateUserData({name: '', avatar: file64}));
        });
    };
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            badgeContent={
                <label className={s.loadAvatar}>
                    <input type="file" onChange={uploadAvatar}/>
                    <img alt="Edit user photo" src={editPhoto} className={s.editUserPhoto}/>
                </label>}
        >
            {userPhoto}
        </Badge>
    );
};