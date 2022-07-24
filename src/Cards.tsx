import React from 'react';
import './App.css';
import { configureStore } from './store/store';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Authorization } from './components/Authorization';
import { Profile } from './components/Profile/Profile';
import { Registration } from './components/Registration';
import { ErrorPage } from './components/ErrorPage';
import { PassRecovery } from './components/PassRecovery';
import { ApplyNewPass } from './components/ApplyNewPass';
import { ComponentsTest } from './components/ComponentsTest';
import { NavigateDemo } from './components/NavigateDemo';

const store = configureStore();

export const Cards: React.FC = () => (
    <Provider store={store}>
        <HashRouter>
            <Routes>
                <Route path="/" element={<NavigateDemo />} />
                <Route path="/authorization" element={<Authorization />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/error404" element={<ErrorPage />} />
                <Route path="/passrecovery" element={<PassRecovery />} />
                <Route path="/applynewpass" element={<ApplyNewPass />} />
                <Route path="/components" element={<ComponentsTest />} />
            </Routes>
        </HashRouter>
    </Provider>
);
