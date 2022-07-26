import React from 'react';
import CheckEmail from './CheckEmail';
import {useAppSelector} from '../../../store/store';

const CheckEmailContainer: React.FC = () => {
    const recoveryEmail = useAppSelector(state => state.auth.recoveryEmail);
    return (
        <CheckEmail recoveryEmail={recoveryEmail}/>
    );
};

export default CheckEmailContainer;