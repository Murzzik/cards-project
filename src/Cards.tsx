import React from 'react';
import './App.css';
import s from '../src/components/Header/Header.module.css';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Profile } from './components/Profile/Profile';
import { Registration } from './components/Registration';
import { ErrorPage } from './components/ErrorPage';
import { ComponentsTest } from './components/ComponentsTest';
import { NavigateDemo } from './components/NavigateDemo';
import CheckEmailContainer from './components/passRecovery/checkEmail/CheckEmailContainer';
import ApplyNewPasswordContainer from './components/passRecovery/newPass/ApplyNewPasswordContainer';
import PassRecoveryContainer from './components/passRecovery/PassRecoveryContainer';
import AuthorizationContainer from './components/authorization/AuthorizationContainer';

const Cards: React.FC = () => {
    return (
        <div>
            <div className={s.headerContainer}>
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<NavigateDemo />} />
                <Route path="/authorization" element={<AuthorizationContainer />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/set-new-password/:token" element={<ApplyNewPasswordContainer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/error404" element={<ErrorPage />} />
                <Route path="/check-email" element={<CheckEmailContainer />} />
                <Route path="/passrecovery" element={<PassRecoveryContainer />} />
                <Route path="/components" element={<ComponentsTest />} />
            </Routes>
        </div>
    );
};

export default Cards;
