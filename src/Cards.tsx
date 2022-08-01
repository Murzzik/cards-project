import React, {useEffect} from 'react';
import './App.css';
import s from '../src/components/Header/Header.module.css';
import {Route, Routes} from 'react-router-dom';
import {Header} from './components/Header/Header';
import {Profile} from './components/Profile/Profile';
import {ErrorPage} from './components/ErrorPage';
import {ComponentsTest} from './components/ComponentsTest';
import CheckEmailContainer from './components/passRecovery/checkEmail/CheckEmailContainer';
import ApplyNewPasswordContainer from './components/passRecovery/newPass/ApplyNewPasswordContainer';
import PassRecoveryContainer from './components/passRecovery/PassRecoveryContainer';
import AuthorizationContainer from './components/authorization/AuthorizationContainer';
import {useAppDispatch} from './store/store';
import {authorizationUser} from './store/reducers/authorization-reducer';
import {RegistrationContainer} from './components/registration/RegistrationContainer';
import { GreetingPage } from './components/GreetingPage/GreetingPage';
// @ts-ignore
import Fade from 'react-reveal/Fade';

const Cards: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authorizationUser());
    }, [dispatch]);

    return (
        <div>
            <Fade left>
            <div className={s.headerContainer}>
                <Header/>
            </div>
            </Fade>
            <Routes>
                <Route path="/" element={<GreetingPage/>}/>
                <Route path="/authorization" element={<AuthorizationContainer/>}/>
                <Route path="/registration" element={<RegistrationContainer/>}/>
                <Route path="/set-new-password/:token" element={<ApplyNewPasswordContainer/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/error404" element={<ErrorPage/>}/>
                <Route path="/check-email" element={<CheckEmailContainer/>}/>
                <Route path="/passrecovery" element={<PassRecoveryContainer/>}/>
                <Route path="/components" element={<ComponentsTest/>}/>
            </Routes>
        </div>
    );
};

export default Cards;
