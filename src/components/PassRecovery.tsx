import React from 'react';
import s from './ComponentsTest.module.css';

export const PassRecovery = () => {
    return (
        <div>
            <a href="/">
                <button className={s.default}>Back</button>
            </a>
            Password recovery
        </div>
    );
};