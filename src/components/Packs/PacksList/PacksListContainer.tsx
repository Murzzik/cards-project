import React, {useEffect} from 'react';
import PacksList from './PacksList';
import {useAppSelector} from '../../../store/store';

const PacksListContainer = () => {
    const packs = useAppSelector(state => state.packs.cardPacks);
    const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    useEffect(() => {

    }, [packs]);
    return (
        <PacksList packs={packs} totalItems={totalItems} isLoggedIn={isLoggedIn}/>
    );
};

export default PacksListContainer;