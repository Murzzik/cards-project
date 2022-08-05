import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Navigate } from 'react-router-dom';
import { PassRecovery } from './PassRecovery';
import { forgotPassword, setRecoveryEmail } from '../../store/reducers/authorization-reducer';

const PassRecoveryContainer: React.FC = () => {
    const isLoad = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();
    const isAutoRedirect = useAppSelector(state => state.auth.isAutoRedirect);

    const repairPassword = (email: string) => {
        dispatch(forgotPassword(email));
        dispatch(setRecoveryEmail(email));
    };

    if(isAutoRedirect) {
        return <Navigate to={'/check-email'} />;
    }
    return (
        <PassRecovery isLoad={isLoad} repairPassword={repairPassword} />
    );
};

export default PassRecoveryContainer;