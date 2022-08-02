import React, {useEffect, useState} from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';
import {useAppDispatch} from '../../store/store';
import {initializedPacks} from '../../store/reducers/packs-reducer';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import {GetCardsType} from '../../api/packAPI';

const PacksContainer = () => {
    const [namePack, setNamePack] = useState<string>('');
    const [min, setMin] = useState<number>();
    const [max, setMax] = useState<number>();
    const debouncedName = useDebounce(namePack, 1500);
    const debouncedMin = useDebounce(min, 1500);
    const debouncedMax = useDebounce(max, 1500);
    const queryParams: GetCardsType = {
        packName: namePack,
        min: min,
        max: max,
        pageCount: 10
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializedPacks(queryParams));
    }, [debouncedName, debouncedMin, debouncedMax,dispatch]);
    return (
        <div>
            <SearchContainer setNamePack={setNamePack} setMin={setMin} setMax={setMax} namePack={namePack}/>
            <PacksListContainer/>
        </div>
    );
};

export default PacksContainer;