import React, {useEffect, useState} from 'react';
import style from './SearchParameters.module.css';
import {Button} from '@material-ui/core';
import NameFilter from './NameFilter/NameFilter';
import OwnerFilter from './OwnerFilter/OwnerFilter';
import QuantityFilter from './QuantityFilter/QuantityFilter';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import {useAppDispatch} from '../../../store/store';
import {initializedPacks} from '../../../store/reducers/packs-reducer';

const SearchContainer = () => {
    const [namePack, setNamePack] = useState<string>('');
    const debouncedValue = useDebounce<string>(namePack, 1500);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializedPacks({packName: namePack}));
    }, [debouncedValue, dispatch]);
    return (
        <div className={style.search_block}>
            <div className={style.search_header}>
                <h2>Packs list</h2>
                <Button variant={'contained'} color={'primary'}>Add new pack</Button>
            </div>
            <div className={style.parameters_block}>
                <NameFilter namePack={namePack} setNamePack={setNamePack}/>
                <OwnerFilter/>
                <QuantityFilter/>
            </div>
        </div>
    );
};

export default SearchContainer;