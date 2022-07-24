import React from 'react';
import preloader from '../../../assets/img/Double Ring-1s-111px.svg';
import style from './Preloader.module.css';

const Preloader: React.FC = () => {
    return (
        <div className={style.preloader}>
            <img src={preloader} alt="preloader image"/>
        </div>
    );
};

export default Preloader;