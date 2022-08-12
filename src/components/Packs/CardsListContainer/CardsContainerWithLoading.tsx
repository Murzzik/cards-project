import React from 'react';
import CardsHeader from './CardsHeader/CardsHeader';
import CardsList from './CardsList';
import { CardsType } from '../../../api/cardsAPI';
import { useAppSelector } from '../../../store/store';
import Preloader from '../../common/Preloader/Preloader';
import { AddCard } from '../../common/universalModal/CardsModal/AddCard';

import s from '../../common/universalModal/CardsModal/cards.module.css'

type CardsContainerWithLoadingPropsType = {
    cardsPack_id: string,
    cards: CardsType[],
}

const CardsContainerWithLoading: React.FC<CardsContainerWithLoadingPropsType> = ({cards, cardsPack_id}) => {

    const isLoading = useAppSelector(state => state.app.status) === 'loading';
    return (
        <div>
            {isLoading && <Preloader />}
            <CardsHeader cardsPack_id={cardsPack_id ? cardsPack_id : ''} />
            {cards.length > 0 ?
                <CardsList cards={cards} />
                :
                <div className={s.add_pack_btn}>
                    <AddCard packID={cardsPack_id} />
                </div>
            }
        </div>
    );
};

export default CardsContainerWithLoading;