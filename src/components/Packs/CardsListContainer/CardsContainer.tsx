import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { initializedCards } from '../../../store/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import CardsHeader from './CardsHeader/CardsHeader';
import CardsList from './CardsList';

const CardsContainer = () => {
    const {cardsPack_id} = useParams();
    const dispatch = useAppDispatch();
    const [searchParameters] = useSearchParams();
    const cardQuestion = searchParameters.get('question');
    let page = Number(searchParameters.get('page'));
    let pageCount = Number(searchParameters.get('pageCount'));
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount);
    useEffect(() => {
        if (cardsPack_id) {
            dispatch(initializedCards({cardsPack_id, cardQuestion, page, pageCount}));
        }

    }, [cardsPack_id, cardQuestion, page, pageCount]);
    const cards = useAppSelector(state => state.cards.cards);
    return (
        <div>
            <CardsHeader cardsPack_id={cardsPack_id ? cardsPack_id : ''}/>
            <CardsList cards={cards} cardsTotalCount={cardsTotalCount}/>
        </div>
    );
};

export default CardsContainer;