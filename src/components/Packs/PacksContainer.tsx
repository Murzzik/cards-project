import React, { useEffect } from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';
import { useAppDispatch } from '../../store/store';
import { initializedPacks } from '../../store/reducers/packs-reducer';
import 'antd/dist/antd.css';
import { useSearchParams } from 'react-router-dom';

const PacksContainer = () => {
        const [searchParameters, setSearchParameters] = useSearchParams();
        const user_id = searchParameters.get('id');
        const min = Number(searchParameters.get('min'));
        const max = Number(searchParameters.get('max'));
        const packName = searchParameters.get('name');
        const page = Number(searchParameters.get('page'));
        let pageCount = Number(searchParameters.get('pageCount'));

        const dispatch = useAppDispatch();

        useEffect(() => {
            dispatch(initializedPacks({user_id, min, max, packName, page, pageCount}));
        }, [dispatch, user_id, min, max, packName, page, pageCount]);

        return (
            <div>
                <SearchContainer/>
                <PacksListContainer/>
            </div>
        );
    }
;

export default PacksContainer;