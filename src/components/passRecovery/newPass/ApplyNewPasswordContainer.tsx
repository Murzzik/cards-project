import React from 'react';
import {useParams} from 'react-router-dom';
import {ApplyNewPass} from './ApplyNewPass';
import {useAppDispatch} from '../../../store/store';
import {createNewPassword} from '../../../store/reducers/authorization-reducer';

const ApplyNewPasswordContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    let {token} = useParams();

    const createPasswords = (password: string, token: string | undefined) => {
        dispatch(createNewPassword(password, token));
    };

    window.history.replaceState('', '', '/new-password');
    return (
        <ApplyNewPass token={token} createPasswords={createPasswords}/>
    );
};

export default ApplyNewPasswordContainer;