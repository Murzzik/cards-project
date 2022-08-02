import React from 'react';
import style from './SearchParameters.module.css';
import {Button} from '@material-ui/core';
import NameFilter from './NameFilter/NameFilter';
import OwnerFilter from './OwnerFilter/OwnerFilter';
import QuantityFilter from './QuantityFilter/QuantityFilter';

type SearchContainerPropsType = {
    setNamePack: (namePack: string) => void,
    setMin: (min: number) => void,
    setMax: (min: number) => void,
    setUserID: (userID: string) => void,
}
const SearchContainer: React.FC<SearchContainerPropsType> = ({setNamePack, setMax, setMin, setUserID}) => {
    return (
        <div className={style.search_block}>
            <div className={style.search_header}>
                <h2>Packs list</h2>
                <Button variant={'contained'} color={'primary'}>Add new pack</Button>
            </div>
            <div className={style.parameters_block}>
                <NameFilter setNamePack={setNamePack}/>
                <OwnerFilter setUserID={setUserID}/>
                <QuantityFilter setMin={setMin} setMax={setMax}/>
            </div>
        </div>
    );
};

export default SearchContainer;