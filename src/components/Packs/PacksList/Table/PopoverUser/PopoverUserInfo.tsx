import React from 'react';
import userDefaultPhoto from '../../../../../assets/images/userPhoto.png';

type PopoverUserInfoPropsType = {
    user_name: string,
    user_avatar: string,
    user_email: string,
}

const PopoverUserInfo: React.FC<PopoverUserInfoPropsType> = ({user_name, user_avatar, user_email}) => {
    return (
        <div>
            {user_avatar.includes('data:image') ?
                <img src={user_avatar} alt=""/>
                :
                <img src={userDefaultPhoto} alt=""/>
            }
            <h3>Name: {user_name}</h3>
            <h3>Email: {user_email}</h3>

        </div>
    );
};

export default PopoverUserInfo;