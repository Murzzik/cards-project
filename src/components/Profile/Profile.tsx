import React from 'react';
import s from './Profile.module.css';
import { Header } from '../Header/Header';
import { Badge } from '@mui/material';
import userPhoto from '../../assets/images/userPhoto.png';
import editPhoto from '../../assets/images/changePhoto.png';
import editUserName from '../../assets/images/Edit.png';
import logout from '../../assets/images/logout.png';

export const Profile = () => {
    return (
        <div className={s.container}>
            <Header />
            <div className={s.profileEdit}>
                <span className={s.profileHeader}>
                    Personal Information
                </span>
                <div className={s.badgeAvatar}>
                    <BadgeAvatars />
                </div>
                <div className={s.editUserName}>
                    <span className={s.userProfileName}>
                        Alexander
                    </span>
                    <div className={s.editIcon}>
                        <img src={editUserName} alt="Edit user name" />
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

export default function BadgeAvatars() {
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            badgeContent={
                <img alt="Edit user photo" src={editPhoto} className={s.editUserPhoto} />
            }
        >
            <img src={userPhoto} alt="User Photo" />
        </Badge>
    );
}