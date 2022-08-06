import React from 'react';
import './App.css';
import s from '../src/components/Header/Header.module.css';
import {Header} from './components/Header/Header';
import {MyRoutes} from './components/MyRoutes';
//@ts-ignore
import Fade from 'react-reveal/Fade';

const Cards: React.FC = () => {
    return (
        <div>
            <div className={s.headerContainer}>
                <Fade left>
                    <Header />
                </Fade>
            </div>
            <MyRoutes />
        </div>
    );
};

export default Cards;
