import React, {useEffect, useState} from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';
import {useAppDispatch} from '../../store/store';
import {initializedPacks} from '../../store/reducers/packs-reducer';
import {GetCardsType} from '../../api/packAPI';

const PacksContainer = () => {
    const [namePack, setNamePack] = useState<string>('');
    const [min, setMin] = useState<number>();
    const [max, setMax] = useState<number>();
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(10);

    const queryParams: GetCardsType = {
        packName: namePack,
        min: min,
        max: max,
        pageCount: pageCount,
        page: page,
        user_id: ''
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializedPacks(queryParams));
    }, [dispatch, min, max, namePack]);
    return (
        <div>
            <SearchContainer setNamePack={setNamePack} setMin={setMin} setMax={setMax}/>
            <PacksListContainer/>
        </div>
    );
};

export default PacksContainer;