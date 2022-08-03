import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {initializedCards} from '../../../store/reducers/cards-reducer';
import {useAppDispatch} from '../../../store/store';

const CardsContainer = () => {
    const {packUserId} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (packUserId) {
            dispatch(initializedCards({cardsPack_id: packUserId}));
        }

    }, [packUserId]);
    return (
        <div>
            Header
            Table
            Pagiantion
        </div>
    );
};

export default CardsContainer;