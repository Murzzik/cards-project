import React, { useEffect } from 'react';
import './App.css';
import s from '../src/components/Header/Header.module.css';
import { Header } from './components/Header/Header';
import { useAppDispatch } from './store/store';
import { authorizationUser } from './store/reducers/authorization-reducer';
import { MyRoutes } from './components/MyRoutes';

const Cards: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authorizationUser());
    }, [dispatch]);
    return (
        <div>
            <div className={s.headerContainer}>
                <Header />
            </div>
            <MyRoutes />
        </div>
    );
};

export default Cards;
