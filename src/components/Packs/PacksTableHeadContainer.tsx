import React from 'react';
import CommonTableHead, {headCellsType, sortModeType} from "./TableHead";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {setPacksParameter} from "../../store/reducers/packsParameterReducer";

const PacksTableHeadContainer = () => {
    const [searchParameters, setSearchParameters] = useSearchParams()
    const parameters = useAppSelector(state => state.packsParameter);
    const dispatch = useAppDispatch()

    const headCells: headCellsType[] = [
        // id's must match query params

        {
            id: 'name',
            label: 'Name',
            align: 'left',
            width: '40%'
        },
        {
            id: 'cardsCount',
            label: 'Cards count',
            // padding: 'none',
            // align: "right"
            width: '10%'
        },
        {
            id: 'updated',
            label: 'Updated',
            // padding: 'none',
            // align: "right"
            width: '10%'
        },
        {
            id: 'user_name',
            label: 'Created by',
            // padding: 'none',
            // align: "right"
            width: '10%'
        },
        {
            id: 'actions',
            label: 'Actions',
            // align: "right"
            width: '10%'
        },
    ]

    const setSearchParams = (sortMode: sortModeType) => {
        const sortPacks = `${sortMode.direction === 'asc' ? '0' : '1'}${sortMode.sortBy}`
        dispatch(setPacksParameter({...parameters, sortPacks}))
        // setSearchParameters({...Object.fromEntries(searchParameters), sortPacks})
    }

    return (
        <CommonTableHead sortCallBack={setSearchParams}
                         headCells={headCells}/>
    );
};

export default PacksTableHeadContainer;