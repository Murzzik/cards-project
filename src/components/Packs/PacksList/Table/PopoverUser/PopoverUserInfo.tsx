import React from 'react';
import userDefaultPhoto from '../../../../../assets/images/icons8-user-100.png';
import style from './PopoverUserInfo.module.css';
import {convertDate} from '../../../../../utils/parsData';
import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../../../../store/store';
import {setPacksParameter} from '../../../../../store/reducers/packsParameterReducer';

type PopoverUserInfoPropsType = {
    user_id: string
    user_name: string,
    user_avatar: string,
    user_email: string,
    registrationDate: string,
    countPacks: number,
}

const PopoverUserInfo: React.FC<PopoverUserInfoPropsType> = ({user_name, user_avatar, user_email, registrationDate, countPacks, user_id}) => {
    const dispatch = useAppDispatch();
    const firstRegistrationDate = convertDate(registrationDate);

    const showPacksOfUser = () => {
        dispatch(setPacksParameter({parameters: {user_id}}));
    };
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
                <div><span>Count of public packs: </span>
                    <NavLink to={'/packs/'} onClick={showPacksOfUser}> {countPacks}</NavLink>
                </div>
            </div>

        </div>
    );
};

export default PopoverUserInfo;