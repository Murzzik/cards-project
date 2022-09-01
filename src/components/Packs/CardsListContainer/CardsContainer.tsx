import React, {useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {initializedCards} from '../../../store/reducers/cards-reducer';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {authorizationUser} from '../../../store/reducers/authorizationReducer';
import Preloader from '../../common/Preloader/Preloader';
import CardsContainerWithLoading from './CardsContainerWithLoading';

const CardsContainer = () => {
    const {cardsPack_id} = useParams();
    const dispatch = useAppDispatch();
    let parameters = useAppSelector(state => state.cardsParameter);
    const cards = useAppSelector(state => state.cards.cards);
    const userProfileName = useAppSelector(state => state.auth.user.name);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const isInitialized = useAppSelector(state => state.app.isInitialized);

    if (!userProfileName) {
        dispatch(authorizationUser());
    }

    useEffect(() => {
        if (cardsPack_id && isLoggedIn) {
            dispatch(initializedCards({...parameters, cardsPack_id}));
        }
    }, [parameters, cardsPack_id, isLoggedIn]);

    if (!isInitialized) {
        return <Preloader/>;
    }

    if (!isLoggedIn) return <Navigate to={'/authorization'}/>;

    return (
        <CardsContainerWithLoading cardsPack_id={cardsPack_id ? cardsPack_id : ''} cards={cards}/>
    );
};

export default CardsContainer;