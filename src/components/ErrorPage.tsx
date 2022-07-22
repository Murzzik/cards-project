import React from 'react';
import s from './ComponentsTest.module.css';

export const ErrorPage = () => {
    return (
        <div>
            <a href="/">
                <button className={s.default}>Back</button>
            </a>
            404 Error
        </div>
    );
};
