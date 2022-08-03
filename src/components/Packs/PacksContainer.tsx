import React, {useEffect, useMemo, useState} from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {initializedPacks} from '../../store/reducers/packs-reducer';
import {GetCardsType} from '../../api/packAPI';
import 'antd/dist/antd.css';
import {Pagination} from 'antd';

const PacksContainer = () => {
    const [namePack, setNamePack] = useState<string>();
    const [min, setMin] = useState<number>();
    const [max, setMax] = useState<number>();
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(10);
    const [userID, setUserID] = useState<string>();
    const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);

    const queryParameters: GetCardsType = useMemo(() => {
        return {
            packName: namePack,
            min: min,
            max: max,
            pageCount: pageCount,
            page: page,
            user_id: userID,
            sortPacks: '0updated'
        };
    }, [namePack, max, min, pageCount, page, userID]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializedPacks(queryParameters));
    }, [queryParameters, dispatch]);

    const onChangeHandker = (page: number, pageSize: number) => {
        setPage(page);
        setPageCount(pageSize);
    };
    return (
        <div>
            <SearchContainer setNamePack={setNamePack} setMin={setMin} setMax={setMax} setUserID={setUserID}/>
            <PacksListContainer/>

            <Pagination
                total={totalItems}
                showSizeChanger
                showQuickJumper
                onChange={onChangeHandker}
                pageSizeOptions={[4, 10, 20]}
                showTotal={(total) => `Total ${total} items`}
            />
        </div>
    );
};

export default PacksContainer;