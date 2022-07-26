import React, {ChangeEvent, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@material-ui/core';
import style from '../../../styles/auth/Auth.module.css';
import {useAppSelector} from '../../../store/store';
import Preloader from '../../common/Preloader/Preloader';
import {Visibility, VisibilityOff} from '@material-ui/icons';

interface State {
    password: string | undefined;
    showPassword: boolean;
}

type ApplyNewPassPropsType = {
    token: string | undefined,
    createPasswords(password: string, token: string | undefined): void
}

export const ApplyNewPass: React.FC<ApplyNewPassPropsType> = ({token, createPasswords}) => {
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let password = e.currentTarget.value;
        setPassword(password);
        if (correctPassword(password)) {
            setError('Minimum 7 symbols');
        } else {
            setError('');
        }
    };

    function correctPassword(name: string) {
        return name.length < 7;
    }

    const onClickHandler = () => {
        createPasswords(password, token);
        setPassword('');
    };
    const isLoad = useAppSelector(state => state.app.status);
    const blockBtn = correctPassword(password);
    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div className={style.main_block}>
            {isLoad === 'loading' && <Preloader/>}
            <h2>Create new Password</h2>
            <FormControl variant="standard" className={style.input_field}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    // id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    onChange={onChangeHandler}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                style={{backgroundColor: 'transparent'}}
                                disableRipple={true}
                            >
                                {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <div className={style.errors}>
                <span>{error}</span>
            </div>
            <p className={style.opacity_text} style={{textAlign: 'left'}}> Create new password and we will send you further instructions to email </p>


            <Button className={style.auth_button} variant={'contained'} color={'primary'} onClick={onClickHandler} disabled={blockBtn}>
                <NavLink style={{color: '#fff', textDecoration: 'none', width: '100%'}} to={'/authorization'}>Create new Password</NavLink>
            </Button>
        </div>
    );
};
