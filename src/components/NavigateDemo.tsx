import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigate.module.css';
import { Helmet } from 'react-helmet';

export const NavigateDemo = () => {
    return (
        <nav className={s.container}>
            <Helmet>
                <style>
                    {'body {background-image: linear-gradient(62deg, #05b8f7 0%, #12dc94 100%);\n}'}
                </style>
            </Helmet>
            <div className={s.elementContainer}>
                <NavLink to="/authorization" className={s.element}>Authorization</NavLink>
            </div>
            <div className={s.elementContainer}>
                <NavLink to="/registration" className={s.element}>Registration</NavLink>
            </div>
            <div className={s.elementContainer}>
                <NavLink to="/profile" className={s.element}>Profile</NavLink>
            </div>
            <div className={s.elementContainer}>
                <NavLink to="/error404" className={s.element}>Error 404</NavLink>
            </div>
            <div className={s.elementContainer}>
                <NavLink to="/passrecovery" className={s.element}>Password recovery</NavLink>
            </div>
            <div className={s.elementContainer}>
                <NavLink to="/applynewpass" className={s.element}>Apply new password</NavLink>
            </div>
            <div className={s.elementContainer}>
                <NavLink to="/components" className={s.element}>Super components</NavLink>
            </div>
        </nav>
    );
};
