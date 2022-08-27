import React from 'react';
import userDefaultPhoto from '../../../../../assets/images/icons8-user-100.png';
import style from './PopoverUserInfo.module.css';
import {convertDate} from '../../../../../utils/parsData';

type PopoverUserInfoPropsType = {
    user_name: string,
    user_avatar: string,
    user_email: string,
    registrationDate: string,
    countPacks: number,
}

const PopoverUserInfo: React.FC<PopoverUserInfoPropsType> = ({user_name, user_avatar, user_email, registrationDate, countPacks}) => {

    const firstRegistrationDate = convertDate(registrationDate);
    return (
        <div className={style.userInfo}>
            {(user_avatar && user_avatar.includes('data:image')) ?
                <img className={style.avatar} src={user_avatar} alt="Personal user avatar"/>
                :
                <img className={style.avatar} src={userDefaultPhoto} alt="Default user avatar"/>
            }
            <div>
                <div><span>Name: </span> {user_name}</div>
                <div><span>Email: </span> <a href={`mailto:${user_email}`}>{user_email}</a></div>
                <div><span>Registration: </span>{firstRegistrationDate}</div>
                <div><span>Count of public packs: </span> {countPacks}</div>
            </div>

        </div>
    );
};

export default PopoverUserInfo;