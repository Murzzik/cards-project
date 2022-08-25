import React, {ReactNode, useState} from 'react';
import 'antd/dist/antd.css';
import {Modal} from 'antd';

type UniversalModalPropsType = {
    children?: ReactNode,
    callBackFunction: () => void,
    clickElement?: ReactNode,
    modalName: string,
    clearData?: () => void,
}

const UniversalModal: React.FC<UniversalModalPropsType> = ({children, callBackFunction, clickElement, modalName, clearData}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        callBackFunction();
        setIsModalVisible(false);
        clearData && clearData();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        clearData && clearData();
    };

    return (
        <div>
            <div onClick={showModal}>
                {clickElement}
            </div>
            <Modal title={modalName}
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   destroyOnClose={true}
            >
                    {children}
            </Modal>
        </div>
    );
};

export default UniversalModal;