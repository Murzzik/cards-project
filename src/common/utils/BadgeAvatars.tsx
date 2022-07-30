import { Badge } from '@mui/material';
import editPhoto from '../../assets/images/changePhoto.png';
import s from './BadgeAvatars.module.css';
import React from 'react';
import { useAppSelector } from '../../store/store';

export const BadgeAvatars = () => {

    const userProfileAvatar = useAppSelector(state => state.profile.avatar)

    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <img alt="Edit user photo" src={editPhoto} className={s.editUserPhoto} />
            }
        >
            <img src={userProfileAvatar} alt="User Photo" className={s.userPhoto} />
        </Badge>
    );
};