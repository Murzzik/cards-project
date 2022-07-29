import React, {useEffect} from 'react';
import {Authorization, FormikErrorType} from './Authorization';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {login, setIsAutoRedirect} from '../../store/reducers/authorization-reducer';
import {Navigate} from 'react-router-dom';

const AuthorizationContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const isLoad = useAppSelector(state => state.app.status);

    console.log(isLoggedIn);
    useEffect(() => {
        dispatch(setIsAutoRedirect(false));
    }, [dispatch]);

    const authorization = (values: FormikErrorType) => {
        dispatch(login(values));
    };

    if (isLoggedIn) return <Navigate to={'/profile'}/>;
    return (
        <Authorization isLoggedIn={isLoggedIn} authorization={authorization} isLoad={isLoad}/>
    );
};

export default AuthorizationContainer;