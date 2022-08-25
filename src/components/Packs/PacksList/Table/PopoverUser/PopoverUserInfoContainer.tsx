import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Popover} from 'antd';
import PopoverUserInfo from './PopoverUserInfo';

type PopoverUserInfoPropsType = {
    user_id: string,
    user_name: string
}

const PopoverUserInfoContainer: React.FC<PopoverUserInfoPropsType> = ({user_name}) => {
    const [visible, setVisible] = useState(false);

    const hide = () => {
        setVisible(false);
    };

    const handleVisibleChange = (newVisible: any) => {
        setVisible(newVisible);
    };
    return (
        <Popover
            content={<a onClick={hide}>Close</a>}
            title={
                <PopoverUserInfo
                    user_name={user_name}
                    user_email="mummintrol@"
                    user_avatar={'12312313'}
                />
            }
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            {user_name}
        </Popover>
    );
};

export default PopoverUserInfoContainer;