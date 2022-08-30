import React from 'react';
import CardsList from './CardsList';
import {CardsType} from '../../../api/cardsAPI';
import {useAppSelector} from '../../../store/store';
import Preloader from '../../common/Preloader/Preloader';
import CardsHeaderContainer from './CardsHeader/CardsHeaderContainer';

type CardsContainerWithLoadingPropsType = {
    cardsPack_id: string,
    cards: CardsType[],
}

const CardsContainerWithLoading: React.FC<CardsContainerWithLoadingPropsType> = ({cards, cardsPack_id}) => {
    const isLoading = useAppSelector(state => state.app.status) === 'loading';

    const cardsList = cards.length > 0 ?
        <CardsList cards={cards}/>
        :
        <h3 style={{textAlign: 'center', color: 'white'}}>
            You don't have cards yet. Please add them.
        </h3>;

    return (
        <div>
            {isLoading && <Preloader/>}
            <CardsHeaderContainer/>
            {cardsList}
        </div>
    );
};

export default CardsContainerWithLoading;