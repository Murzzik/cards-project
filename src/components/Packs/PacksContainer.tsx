import React, {useEffect} from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {initializedPacks} from '../../store/reducers/packs-reducer';
import 'antd/dist/antd.css';
import {Navigate} from 'react-router-dom';
import {authorizationUser} from '../../store/reducers/authorization-reducer';
import Preloader from '../common/Preloader/Preloader';

const PacksContainer = () => {
        const dispatch = useAppDispatch();
        const isInitialized = useAppSelector(state => state.app.isInitialized);
        const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
        const userProfileName = useAppSelector(state => state.auth.user.name);
        let parameters = useAppSelector(state => state.packsParameter);

        if (!userProfileName) {
            dispatch(authorizationUser());
        }

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
            <div>
                <SearchContainer/>
                <PacksListContainer/>
            </div>
        );
    }
;

export default PacksContainer;