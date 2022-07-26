import React from 'react';
import UniversalPagination from '../../common/Pagination/UniversalPagination';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {setCardsParameter} from '../../../store/reducers/cardsParametersReducer';

const CardsPaginationContainer: React.FC = () => {
    const {cardsPack_id} = useParams();
    const totalItems = useAppSelector(state => state.cards.cardsTotalCount);
    let page = useAppSelector(state => state.cards.page);
    let pageCount = useAppSelector(state => state.cards.pageCount);
    let parameters = useAppSelector(state => state.packsParameter);
    const dispatch = useAppDispatch();
    const changeCardsPaginationData = (page: number, pageCount: number) => {
        if (cardsPack_id) {
            dispatch(setCardsParameter({parameters: {...parameters, page, pageCount, cardsPack_id}}));
        }
    };
    return (
        <UniversalPagination totalItems={totalItems} page={page} pageCount={pageCount} changePaginationData={changeCardsPaginationData}/>
    );
};

export default CardsPaginationContainer;