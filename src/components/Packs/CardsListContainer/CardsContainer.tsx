import React, {useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {initializedCards} from '../../../store/reducers/cards-reducer';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CardsHeader from './CardsHeader/CardsHeader';
import CardsList from './CardsList';
import CardsPaginationContainer from './CardsPaginationContainer';
import {authorizationUser} from '../../../store/reducers/authorization-reducer';
import Preloader from '../../common/Preloader/Preloader';

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
        <div>
            <CardsHeader cardsPack_id={cardsPack_id ? cardsPack_id : ''}/>
            {cardsPack_id ? <CardsList cards={cards}/> : ''}
            <CardsPaginationContainer/>
        </div>
    );
};

export default CardsContainer;