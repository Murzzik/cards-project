import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthorizationContainer from './authorization/AuthorizationContainer';
import { RegistrationContainer } from './registration/RegistrationContainer';
import ApplyNewPasswordContainer from './passRecovery/newPass/ApplyNewPasswordContainer';
import { Profile } from './Profile/Profile';
import PacksContainer from './Packs/PacksContainer';
import { ErrorPage } from './ErrorPage';
import CheckEmailContainer from './passRecovery/checkEmail/CheckEmailContainer';
import PassRecoveryContainer from './passRecovery/PassRecoveryContainer';
import CardsContainer from './Packs/CardsListContainer/CardsContainer';

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/authorization" element={<AuthorizationContainer />} />
            <Route path="/registration" element={<RegistrationContainer />} />
            <Route path="#/set-new-password/:token" element={<ApplyNewPasswordContainer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/packs" element={<PacksContainer />} />
            <Route path="packs/:cardsPack_id" element={<CardsContainer />} />
            <Route path="/error404" element={<ErrorPage />} />
            <Route path="/check-email" element={<CheckEmailContainer />} />
            <Route path="/passrecovery" element={<PassRecoveryContainer />} />
        </Routes>
    );
};