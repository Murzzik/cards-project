import React, {useEffect, useState} from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';
import {useAppDispatch} from '../../store/store';
import {initializedPacks} from '../../store/reducers/packs-reducer';
import {GetCardsType} from '../../api/packAPI';

const PacksContainer = () => {
    const [namePack, setNamePack] = useState<string>();
    const [min, setMin] = useState<number>();
    const [max, setMax] = useState<number>();
    const [page, setPage] = useState<number>();
    const [pageCount, setPageCount] = useState<number>();
    const [userID, setUserID] = useState<string>();

    const queryParams: GetCardsType = {
        packName: namePack,
        min: min,
        max: max,
        pageCount: pageCount,
        page: page,
        user_id: userID,
         sortPacks: '0updated'
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializedPacks(queryParams));
    }, [queryParams, dispatch]);
    return (
        <div>
            <SearchContainer setNamePack={setNamePack} setMin={setMin} setMax={setMax} setUserID={setUserID}/>
            <PacksListContainer/>
        </div>
    );
};

export default PacksContainer;