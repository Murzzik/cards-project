import React, {useEffect} from 'react';
import PacksList from './PacksList';
import {useAppSelector} from '../../../store/store';

const PacksListContainer = () => {
    const packs = useAppSelector(state => state.packs.cardPacks)
    useEffect(()=>{

    },[packs])
        return (
        <PacksList packs={packs}/>
    );
};

export default PacksListContainer;