import React, {useEffect} from 'react';
import style from './SearchParameters.module.css';
import {Button} from '@material-ui/core';
import NameFilter from './NameFilter/NameFilter';
import OwnerFilter from './OwnerFilter/OwnerFilter';
import QuantityFilter from './QuantityFilter/QuantityFilter';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {addNewPack} from '../../../store/reducers/packs-reducer';
import {useSearchParams} from 'react-router-dom';

type SearchContainerPropsType = {}
const SearchContainer: React.FC<SearchContainerPropsType> = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    const owner = searchParameters.get('id');
    let userId = '';
    if (owner) {
        userId = owner;
    }
    const page = searchParameters.get('page');
    const triggerAddNewPack = useAppSelector(state => state.packs.triggerAddNewPack);
    const dispatch = useAppDispatch();

    const newPackHandler = () => {
        const name = 'New pack success added';
        // setSearchParameters({...Object.fromEntries(searchParameters), page: '1'});
        dispatch(addNewPack(name, userId));
    };
    useEffect(() => {
        setSearchParameters({...Object.fromEntries(searchParameters), page: '0'});
        // if (page==="0") {
        //     setSearchParameters({...Object.fromEntries(searchParameters), page: '1'});
        // }
    }, [triggerAddNewPack]);

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