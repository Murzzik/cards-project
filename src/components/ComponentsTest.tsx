import React from 'react';
import { Helmet } from 'react-helmet';
import s from './ComponentsTest.module.css';
import { SuperInput } from './SuperComponents/SuperInput/SuperInput';
import { SuperButton } from './SuperComponents/SuperButton/SuperButton';
import { SuperCheckbox } from './SuperComponents/SuperCheckbox/SuperCheckbox';

export const ComponentsTest = () => {
    return (
        <div>
            <Helmet>
                <style>
                    {'body {background-image: linear-gradient(62deg, #05b8f7 0%, #12dc94 100%);\n}'}
                </style>
            </Helmet>
            <a href="/">
                <button className={s.default}>Back</button>
            </a>
            <div className={s.container}>
                <span className={s.titleText}>Super Input</span>
                <SuperInput />
                <span className={s.titleText}>Super Button</span>
                <SuperButton>
                    Button
                </SuperButton>
                <span className={s.titleText}>Super Checkbox</span>
                <SuperCheckbox />
            </div>
        </div>
    );
};