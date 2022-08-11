import React, {ReactNode, useState} from 'react';
import 'antd/dist/antd.css';
import {Modal} from 'antd';

type UniversalModalPropsType = {
    children: ReactNode,
    callBackFunction: () => void,
    clickElement: ReactNode,
    modalName: string
}

const UniversalModal: React.FC<UniversalModalPropsType> = ({children, callBackFunction, clickElement, modalName}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        callBackFunction();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <div onClick={showModal}>
                {clickElement}
            </div>
            <Modal title={modalName} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {children}
            </Modal>
        </>
    );
};

export default UniversalModal;