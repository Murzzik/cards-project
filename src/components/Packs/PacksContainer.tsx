import React from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';

const PacksContainer = () => {
    return (
        <div>
           <SearchContainer />
           <PacksListContainer />
        </div>
    );
};

export default PacksContainer;