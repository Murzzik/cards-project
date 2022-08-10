import React from 'react';
import UniversalPagination from '../../../common/Pagination/UniversalPagination';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {setPacksParameter} from '../../../../store/reducers/packsParameterReducer';

const PacksPaginationContainer: React.FC = () => {
    const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);
    let page = useAppSelector(state => state.packs.page);
    let pageCount = useAppSelector(state => state.packs.pageCount);
    let parameters = useAppSelector(state => state.packsParameter);
    const dispatch = useAppDispatch();
    const changePacksPaginationData = (page: number, pageCount: number) => {
        dispatch(setPacksParameter({...parameters, page, pageCount}));
    };
    return (
        <UniversalPagination page={page} totalItems={totalItems} pageCount={pageCount} changePaginationData={changePacksPaginationData}/>
    );
};

export default PacksPaginationContainer;