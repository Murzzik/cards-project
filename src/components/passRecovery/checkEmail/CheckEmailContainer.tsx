import React from 'react';
import { useAppSelector } from '../../../store/store';
import CheckEmailTest from './CastomCheckEmailTest';

const CheckEmailContainer: React.FC = () => {
    const recoveryEmail = useAppSelector(state => state.auth.recoveryEmail);
    return (
        <CheckEmailTest recoveryEmail={recoveryEmail} />
    );
};

export default CheckEmailContainer;