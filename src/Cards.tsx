import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Authorization} from './components/authorization/Authorization';
import {Profile} from './components/Profile';
import {Registration} from './components/Registration';
import {ErrorPage} from './components/ErrorPage';
import {PassRecovery} from './components/PassRecovery';
import {ApplyNewPass} from './components/ApplyNewPass';
import {ComponentsTest} from './components/ComponentsTest';
import {NavigateDemo} from './components/NavigateDemo';

const Cards: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NavigateDemo/>}/>
                <Route path="/authorization" element={<Authorization/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/error404" element={<ErrorPage/>}/>
                <Route path="/passrecovery" element={<PassRecovery/>}/>
                <Route path="/applynewpass" element={<ApplyNewPass/>}/>
                <Route path="/components" element={<ComponentsTest/>}/>
            </Routes>
        </div>
    );
};

export default Cards;
