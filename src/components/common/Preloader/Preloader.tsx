import React from 'react';
import style from './Preloader.module.css';
import {CircularProgress} from '@material-ui/core';

const Preloader: React.FC = () => {
    return (
        <div className={style.preloader}>
            {/*<img src={preloader} alt="preloader image"/>*/}
            <CircularProgress/>
        </div>
    );
};

export default Preloader;