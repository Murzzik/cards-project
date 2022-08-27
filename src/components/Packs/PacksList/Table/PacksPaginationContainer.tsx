import React from 'react';
import UniversalPagination from '../../../common/Pagination/UniversalPagination';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {setPacksParameter} from '../../../../store/reducers/packsParameterReducer';

const PacksPaginationContainer: React.FC = () => {
    const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);
    let parameters = useAppSelector(state => state.packsParameter);
    const dispatch = useAppDispatch();
    const changePacksPaginationData = (page: number, pageCount: number) => {
        dispatch(setPacksParameter({parameters: {...parameters, page, pageCount}}));
    };
    return (
        <UniversalPagination totalItems={totalItems} changePaginationData={changePacksPaginationData}/>
    );
};

export default PacksPaginationContainer;