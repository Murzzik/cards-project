import React from 'react';

import PacksPaginationContainer from './PacksList/PacksPaginationContainer';
import {useAppSelector} from '../../store/store';
import PacksList from './PacksList/PacksList';
import Preloader from '../common/Preloader/Preloader';
import PacksSearchContainer from './PacksList/SearchPacks/PacksSearchContainer';

const PackContainerWithLoading: React.FC = () => {
    const isLoading = useAppSelector(state => state.app.status) === 'loading';
    return (
        <div>
            {isLoading && <Preloader/>}
            <PacksSearchContainer/>
            <PacksList/>
            <PacksPaginationContainer/>
        </div>

    );
};

export default PackContainerWithLoading;