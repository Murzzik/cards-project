import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {initializedCards} from '../../../store/reducers/cards-reducer';
import {useAppDispatch} from '../../../store/store';

const CardsContainer = () => {
    const {cardsPack_id} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (cardsPack_id) {
            dispatch(initializedCards({cardsPack_id}));
        }

    }, [cardsPack_id]);
    return (
        <div>
            Header
            Table
            Pagiantion
        </div>
    );
};

export default CardsContainer;