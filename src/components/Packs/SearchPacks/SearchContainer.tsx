import React from 'react';
import style from './SearchParameters.module.css';
import {Button} from '@material-ui/core';
import NameFilter from './NameFilter/NameFilter';
import OwnerFilter from './OwnerFilter/OwnerFilter';
import QuantityFilter from './QuantityFilter/QuantityFilter';
import { useAppDispatch } from '../../../store/store';
import { addNewPack } from '../../../store/reducers/packs-reducer';
import {useSearchParams} from 'react-router-dom';

type SearchContainerPropsType = {}
const SearchContainer: React.FC<SearchContainerPropsType> = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();

    const dispatch = useAppDispatch()

    const newPackHandler = () => {
        const name = 'New pack success added'
        setSearchParameters({...Object.fromEntries(searchParameters), page: "1"});
        dispatch(addNewPack(name))
    }

    return (
        <div className={style.searchBlock}>
            <div className={style.searchHeader}>
                <h2>Packs list</h2>
                <Button variant={'contained'} color={'primary'} onClick={newPackHandler}>Add new pack</Button>
            </div>
            <div className={style.parametersBlock}>
                <NameFilter/>
                <OwnerFilter/>
                <QuantityFilter/>
            </div>
        </div>
    );
};

export default SearchContainer;