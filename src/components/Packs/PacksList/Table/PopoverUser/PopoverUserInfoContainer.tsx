import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Popover, Spin} from 'antd';
import PopoverUserInfo from './PopoverUserInfo';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {getUserProfile} from '../../../../../store/reducers/usersProfileReducer';
import style from './PopoverUserInfo.module.css';

type PopoverUserInfoPropsType = {
    user_name: string,
    user_id: string,
}

const PopoverUserInfoContainer: React.FC<PopoverUserInfoPropsType> = ({user_name, user_id}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.usersInfo.users).find(u => u._id === user_id);
    const isLoading = useAppSelector(state => state.usersInfo.isLoading);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!user) {
            if (visible) {
                dispatch(getUserProfile(user_id));
            }
        }

    }, [visible]);

    const hide = () => {
        setVisible(false);
    };

    const handleVisibleChange = (newVisible: any) => {
        setVisible(newVisible);
    };
    return (
        <Popover
            content={
                <div className={style.popoverBlock}>
                    {isLoading === 'loading' ?
                        <Spin tip="Loading..." size="small"
                              className={style.spin}
                        />
                        :
                        <div>
                            {user && <PopoverUserInfo
                                user_id = {user_id}
                                user_name={user_name}
                                user_email={user.email}
                                user_avatar={user.avatar}
                                registrationDate={user.created}
                                countPacks={user.publicCardPacksCount}
                            />}
                            <a onClick={hide}>Close</a>
                        </div>
                    }
                </div>
            }
            title={'Profile info'}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <span className={style.popoverTrigger}>{user_name}</span>
        </Popover>
    );
};

export default PopoverUserInfoContainer;