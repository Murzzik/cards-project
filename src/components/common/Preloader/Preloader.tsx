import React from 'react';
import style from './Preloader.module.css';
import preloader from '../../../assets/images/Double Ring-1s-111px.svg';

const Preloader: React.FC = () => {
    return (
        <div className={style.preloader}>
            <img src={preloader} alt="preloader image"/>
            {/*<CircularProgress />*/}
        </div>
    );
};

export default Preloader;