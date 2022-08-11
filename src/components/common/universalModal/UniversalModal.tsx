import React, {ReactNode, useState} from 'react';
import 'antd/dist/antd.css';
import {Modal} from 'antd';

type UniversalModalPropsType = {
    children: ReactNode,
    nameButton: string,
    someFunction: () => void,
    clickElement: ReactNode
}

const UniversalModal: React.FC<UniversalModalPropsType> = ({children, nameButton, someFunction, clickElement}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        someFunction();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            {/*<Button type="primary" onClick={showModal}>{nameButton}</Button>*/}
            <div onClick={showModal}>
                {clickElement}
            </div>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {children}
            </Modal>
        </>
    );
};

export default UniversalModal;