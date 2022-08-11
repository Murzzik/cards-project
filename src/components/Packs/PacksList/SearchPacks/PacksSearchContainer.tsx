import React from 'react';
import style from './SearchParameters.module.css';
import NameFilter from './NameFilter/NameFilter';
import OwnerFilter from './OwnerFilter/OwnerFilter';
import QuantityFilter from './QuantityFilter/QuantityFilter';
import AddNewPackModal from '../../../common/universalModal/AddNewPackModal';

const PacksSearchContainer: React.FC = () => {

    return (
        <div className={style.searchBlock}>
            <div className={style.searchHeader}>
                <h2>Packs list</h2>
                <AddNewPackModal/>
            </div>
            <div className={style.parametersBlock}>
                <NameFilter/>
                <OwnerFilter/>
                <QuantityFilter/>
            </div>

        </div>
    );
};

export default PacksSearchContainer;