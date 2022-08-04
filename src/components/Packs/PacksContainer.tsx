import React, {useEffect} from 'react';
import SearchContainer from './SearchPacks/SearchContainer';
import PacksListContainer from './PacksList/PacksListContainer';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {initializedPacks} from '../../store/reducers/packs-reducer';
import 'antd/dist/antd.css';
import {Pagination} from 'antd';
import {NavLink, useSearchParams} from 'react-router-dom';

const PacksContainer = () => {
        const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);

        const [searchParameters, setSearchParameters] = useSearchParams();
        const user_id = searchParameters.get('id');
        const min = Number(searchParameters.get('min'));
        const max = Number(searchParameters.get('max'));
        const packName = searchParameters.get('name');
        const page = Number(searchParameters.get('page'));
        let pageCount = Number(searchParameters.get('pageCount'));

        if (!pageCount) {
            pageCount = 4;
        }
        const dispatch = useAppDispatch();

        useEffect(() => {
            dispatch(initializedPacks({user_id, min, max, packName, page, pageCount}));
        }, [dispatch, user_id, min, max, packName, page, pageCount]);

        const onChangeHandlerPage = (page: number, size = 4) => {
            setSearchParameters({...Object.fromEntries(searchParameters), pageCount: size.toString(), page: page.toString()});
        };

        return (
            <div>
                <SearchContainer/>
                <PacksListContainer/>
                    {/*для теста*/}
                <Pagination
                    total={totalItems}
                    showSizeChanger
                    showQuickJumper
                    onChange={onChangeHandlerPage}
                    defaultPageSize={pageCount}
                    pageSizeOptions={[4, 10, 20]}
                    defaultCurrent={page}
                    showTotal={(total) => `Total ${total} items`}
                    style={{width: '80%', margin: '0 auto', color:"white", backgroundColor: "black", padding:"10px", borderRadius:"5px", marginTop:"20px", textAlign:"right"}}
                />
            </div>
        );
    }
;

export default PacksContainer;