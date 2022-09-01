import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {Registration} from './Registration';

import {Navigate} from 'react-router-dom';
import {registration, setRegisteredUser} from '../../store/reducers/authorizationReducer';

export type RegistrationData = {
    email: string,
    password: string,
}

export const RegistrationContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const isRegistered = useAppSelector(state => state.auth.isRegistered);
    const isLoad = useAppSelector(state => state.app.status);
    const isDisabled = isLoad === 'loading';
    const onRegistrationSubmit = (values: RegistrationData) => {
        dispatch(registration(values));
    };
    useEffect(() => {
        dispatch(setRegisteredUser({parameter: {isRegistered: false}}));
    }, [dispatch]);

    if (isRegistered) {
        return <Navigate to="/authorization"/>;
    }
    return (
        <Registration isLoggedIn={isLoggedIn} onRegistrationSubmit={onRegistrationSubmit} isLoad={isLoad}
                      isDisabled={isDisabled}/>
    );
};