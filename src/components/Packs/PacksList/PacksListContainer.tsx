import React, {useEffect} from 'react';
import PacksList from './PacksList';
import {useAppSelector} from '../../../store/store';

const PacksListContainer = () => {
    const packs = useAppSelector(state => state.packs.cardPacks);
    const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);
    useEffect(() => {

    }, [packs]);
    return (
        <PacksList packs={packs} totalItems={totalItems}/>
    );
};

export default PacksListContainer;