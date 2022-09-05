import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {initializedPacks} from '../../store/reducers/packsReducer';
import 'antd/dist/antd.css';
import {Navigate} from 'react-router-dom';
import {authorizationUser} from '../../store/reducers/authorizationReducer';
import Preloader from '../common/Preloader/Preloader';
import PackContainerWithLoading from './PackContainerWithLoading';

const PacksContainer = () => {
        const dispatch = useAppDispatch();
        const isInitialized = useAppSelector(state => state.app.isInitialized);
        const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
        const userProfileName = useAppSelector(state => state.auth.user.name);
        let parameters = useAppSelector(state => state.packsParameter);

        useEffect(() => {
            if (!userProfileName) {
                dispatch(authorizationUser());
            }
        }, [userProfileName]);

        useEffect(() => {
            if (isLoggedIn) {
                dispatch(initializedPacks(parameters));
            }
        }, [parameters, isLoggedIn]);

        if (!isInitialized) {
            return <Preloader/>;
        }
        if (!isLoggedIn) return <Navigate to={'/authorization'}/>;

        return (
            <PackContainerWithLoading/>
        );
    }
;

export default PacksContainer;