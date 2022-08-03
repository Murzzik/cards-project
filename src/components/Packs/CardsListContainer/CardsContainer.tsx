import React, {useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {initializedCards} from '../../../store/reducers/cards-reducer';
import {useAppDispatch} from '../../../store/store';
import CardsHeader from './CardsHeader/CardsHeader';

const CardsContainer = () => {
    const {cardsPack_id} = useParams();
    const dispatch = useAppDispatch();
    const [searchParameters, setSearchParameters] = useSearchParams();
    const cardQuestion = searchParameters.get('question');
    useEffect(() => {
        if (cardsPack_id) {
            dispatch(initializedCards({cardsPack_id, cardQuestion}));
        }

    }, [cardsPack_id, cardQuestion]);
    return (
        <div>
            <CardsHeader cardsPack_id={cardsPack_id}/>
            Table
            Pagiantion
        </div>
    );
};

export default CardsContainer;