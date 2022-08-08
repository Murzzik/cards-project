import React, {useEffect} from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {initializedPacks} from '../../store/reducers/packs-reducer';
import 'antd/dist/antd.css';
import {Navigate, useSearchParams} from 'react-router-dom';
import {authorizationUser} from '../../store/reducers/authorization-reducer';
import Preloader from '../common/Preloader/Preloader';

const PacksContainer = () => {
        const [searchParameters] = useSearchParams();
        const user_id = searchParameters.get('id');
        const min = Number(searchParameters.get('min'));
        const max = Number(searchParameters.get('max'));
        const packName = searchParameters.get('name');
        const page = Number(searchParameters.get('page'));
        let pageCount = Number(searchParameters.get('pageCount'));
        const dispatch = useAppDispatch();

        const isInitialized = useAppSelector(state => state.app.isInitialized);
        const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

        const userProfileName = useAppSelector(state => state.auth.user.name);
        if (!userProfileName) {
            dispatch(authorizationUser());
        }

        useEffect(() => {
            if (isLoggedIn) {
                dispatch(initializedPacks({user_id, min, max, packName, page, pageCount}));
            }
        }, [dispatch, user_id, min, max, packName, page, pageCount, isLoggedIn]);

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