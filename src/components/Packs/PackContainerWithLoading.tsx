import React from 'react';
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
        </div>

    );
};

export default PackContainerWithLoading;