import React from 'react';
import UniversalPagination from '../../common/Pagination/UniversalPagination';
import {useSearchParams} from 'react-router-dom';
import {useAppSelector} from '../../../store/store';

const CardsPaginationContainer: React.FC = () => {
    const totalItems = useAppSelector(state => state.cards.cardsTotalCount);
    const [searchParameters, setSearchParameters] = useSearchParams();

    let page = Number(searchParameters.get('page'));
    let pageCount = Number(searchParameters.get('pageCount'));
    if (!page) page = 1;
    if (!pageCount) pageCount = 4;

    const changeCardsPaginationData = (page: number, pageCount = 4) => {
        setSearchParameters({
            ...Object.fromEntries(searchParameters),
            pageCount: pageCount.toString(),
            page: page.toString(),
        });
    };
    return (
        <UniversalPagination totalItems={totalItems} page={page} pageCount={pageCount} changePaginationData={changeCardsPaginationData}/>
    );
};

export default CardsPaginationContainer;