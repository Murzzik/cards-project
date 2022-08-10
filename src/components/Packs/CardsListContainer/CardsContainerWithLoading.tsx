import React from 'react';
import CardsHeader from './CardsHeader/CardsHeader';
import CardsList from './CardsList';
import CardsPaginationContainer from './CardsPaginationContainer';
import {CardsType} from '../../../api/cardsAPI';
import {useAppSelector} from '../../../store/store';
import Preloader from '../../common/Preloader/Preloader';

type CardsContainerWithLoadingPropsType = {
    cardsPack_id: string,
    cards: CardsType[],
}

const CardsContainerWithLoading: React.FC<CardsContainerWithLoadingPropsType> = ({cards, cardsPack_id}) => {
    const isLoading = useAppSelector(state => state.app.status) === 'loading';
    return (
        <div>
            {isLoading && <Preloader/>}
            <CardsHeader cardsPack_id={cardsPack_id ? cardsPack_id : ''}/>
            {cardsPack_id ? <CardsList cards={cards}/> : ''}
            <CardsPaginationContainer/>
        </div>
    );
};

export default CardsContainerWithLoading;