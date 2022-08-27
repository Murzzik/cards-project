import React from 'react';
import {Spin} from 'antd';
import style from './Preloader.module.css';

const Preloader: React.FC = () => {
    return (
        <Spin className={style.preloader} size={'large'}/>

    );
};

export default Preloader;