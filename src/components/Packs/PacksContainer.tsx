import React, {useEffect} from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';
import {useAppDispatch} from '../../store/store';
import {initializedPacks} from '../../store/reducers/packs-reducer';

const PacksContainer = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializedPacks());
    }, [dispatch]);
    return (
        <div>
            <SearchContainer/>
            <PacksListContainer/>
        </div>
    );
};

export default PacksContainer;