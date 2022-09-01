import { Badge } from '@mui/material';
import editPhoto from '../../../assets/images/changePhoto.png';
import s from './BadgeAvatars.module.css';
import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { uploadPhoto } from '../../../utils/uploadPhoto';
import { updateUserData } from '../../../store/reducers/authorizationReducer';

export const BadgeAvatars = () => {

    const userProfileAvatar = useAppSelector(state => state.auth.user.avatar);
    const dispatch = useAppDispatch();

    const uploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        uploadPhoto(e, (file64: string) => {
            dispatch(updateUserData('', file64));
        });
    };
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <label className={s.loadAvatar}>
                    <input type="file" onChange={uploadAvatar} />
                    <img alt="Edit user photo" src={editPhoto} className={s.editUserPhoto} />
                </label>}
        >
            <img src={userProfileAvatar} alt="User Photo" className={s.userPhoto} />
        </Badge>
    );
};