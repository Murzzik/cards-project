import React, {useEffect} from 'react';
import UniversalPagination from '../../common/Pagination/UniversalPagination';
import {useAppSelector} from '../../../store/store';
import {useSearchParams} from 'react-router-dom';

const PacksPaginationContainer: React.FC = () => {
    // const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);
    // const [searchParameters, setSearchParameters] = useSearchParams();
    // let currentPage = useAppSelector(state => state.packs.page);
    // let pageCount = useAppSelector(state => state.packs.pageCount);
    // // let page = Number(searchParameters.get('page'));
    // // let pageCount = Number(searchParameters.get('pageCount'));
    // // if (!page) page = 1;
    // // if (!pageCount) pageCount = 4;
    // // useEffect(()=>{
    // //     currentPage = page!==currentPage? currentPage : page
    // // },[currentPage, page])
    // // currentPage = page !== currentPage ? currentPage : page;
    // useEffect(() => {
    // }, [currentPage, pageCount]);
    // const changePacksPaginationData = (page: number, pageCount = 4) => {
    //     console.log(page);
    //     setSearchParameters({
    //         ...Object.fromEntries(searchParameters),
    //         pageCount: pageCount.toString(),
    //         page: page.toString(),
    //     });
    // };
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