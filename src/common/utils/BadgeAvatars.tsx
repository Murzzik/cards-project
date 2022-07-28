import { Badge } from '@mui/material';
import editPhoto from '../../assets/images/changePhoto.png';
import s from './BadgeAvatars.module.css';
import userPhoto from '../../assets/images/userPhoto.png';
import React from 'react';

export const BadgeAvatars = () => {
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <img alt="Edit user photo" src={editPhoto} className={s.editUserPhoto} />
            }
        >
            <img src={userPhoto} alt="User Photo" />
        </Badge>
    );
};