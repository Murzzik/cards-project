import React from 'react';
import PacksSearchContainer from './SearchPacks/SearchContainer';
import PacksPaginationContainer from './PacksList/PacksPaginationContainer';
import {useAppSelector} from '../../store/store';
import PacksList from './PacksList/PacksList';
import Preloader from '../common/Preloader/Preloader';

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