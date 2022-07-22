import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import s from './SuperButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const SuperButton: React.FC<SuperButtonPropsType> = ({red, className, ...restProps}) => {
    const finalClassName = `${red ? s.red : s.default} ${className}`;

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    );
};
