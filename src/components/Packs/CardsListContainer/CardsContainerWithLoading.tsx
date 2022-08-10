import React from 'react';
import CardsHeader from './CardsHeader/CardsHeader';
import CardsList from './CardsList';
import {CardsType} from '../../../api/cardsAPI';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import Preloader from '../../common/Preloader/Preloader';
import {Button} from '@material-ui/core';
import {addNewCard} from '../../../store/reducers/cards-reducer';

type CardsContainerWithLoadingPropsType = {
    cardsPack_id: string,
    cards: CardsType[],
}

const CardsContainerWithLoading: React.FC<CardsContainerWithLoadingPropsType> = ({cards, cardsPack_id}) => {
    const dispatch = useAppDispatch();

    const addPackHandler = (id: string) => {
        const question = 'Who is your boss baby';
        const answer = 'You are, my papa';
        dispatch(addNewCard(id, question, answer));
    };
    const isLoading = useAppSelector(state => state.app.status) === 'loading';
    return (
        <div>
            {isLoading && <Preloader/>}
            <CardsHeader cardsPack_id={cardsPack_id ? cardsPack_id : ''}/>
            {cards.length > 0 ?
                <CardsList cards={cards}/>
                :
                <Button variant={'contained'} style={{left: '50%'}} color={'primary'} onClick={() => addPackHandler(cardsPack_id)}>Add new
                    card</Button>
            }
        </div>
    );
};

export default CardsContainerWithLoading;