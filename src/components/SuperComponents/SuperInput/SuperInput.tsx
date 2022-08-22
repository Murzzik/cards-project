import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from 'react';
import s from './SuperInput.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const SuperInput: React.FC<SuperInputType> = (
    {
        type,
        onChange,
        onChangeText,
        onKeyPress, onEnter,
        error,
        className,
        spanClassName,
        ...restProps
    }) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeText && onChangeText(e.currentTarget.value);
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter();
    };

    const finalSpanClassName = `${s.errorSpan} ${s.errorSpan ? s.errorSpan : ''}`;
    const finalInputClassName = `${s.mainInput} ${error ? s.error : s.mainInput} ${className}`;

    return (
        <div>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={`${finalInputClassName} + ${s.secondInput}`}

                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    );
};
