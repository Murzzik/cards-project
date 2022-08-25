import React from 'react';
import userDefaultPhoto from '../../../../../assets/images/userPhoto.png';
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
                <img className={style.avatar} src={user_avatar} alt="" style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
                :
                <img className={style.avatar} src={userDefaultPhoto} alt=""/>
            }
            <div>
                <h3>Name: {user_name}</h3>
                <h3>Email: <a>{user_email}</a></h3>
                <h3>Registration: {firstRegistrationDate}</h3>
                <h3>Count public Packs: {countPacks}</h3>
            </div>

        </div>
    );
};

export default PopoverUserInfo;