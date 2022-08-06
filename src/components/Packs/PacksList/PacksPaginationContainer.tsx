import React from 'react';
import UniversalPagination from '../../common/Pagination/UniversalPagination';
import {useAppSelector} from '../../../store/store';
import {useSearchParams} from 'react-router-dom';

const PacksPaginationContainer: React.FC = () => {
    const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);
    const [searchParameters, setSearchParameters] = useSearchParams();

    let page = Number(searchParameters.get('page'));
    let pageCount = Number(searchParameters.get('pageCount'));
    if (!page) page = 1;
    if (!pageCount) pageCount = 4;

    const changePacksPaginationData = (page: number, pageCount = 4) => {
        setSearchParameters({
            ...Object.fromEntries(searchParameters),
            pageCount: pageCount.toString(),
            page: page.toString(),
        });
    };
    return (
        <UniversalPagination page={page} totalItems={totalItems} pageCount={pageCount} changePaginationData={changePacksPaginationData}/>
    );
};

export default PacksPaginationContainer;