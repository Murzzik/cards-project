import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import PacksTableHeadContainer from './PacksTableHeadContainer';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import {Pack} from '../../../../store/reducers/packs-reducer';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {NavLink} from 'react-router-dom';
import {convertDate} from '../../../../utils/parsData';
import PacksPaginationContainer from './PacksPaginationContainer';
import {useAppSelector} from '../../../../store/store';
import {styled} from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import IconGroup from './IconGroup/IconGroupPropsType';

import s from '../PackList.module.css'

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const TablesContainer: React.FC = () => {

    const packs = useAppSelector(state => state.packs.cardPacks);

    return (
        <div>
            <TableContainer component={Paper} style={{width: '80%', margin: '0 auto'}}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <PacksTableHeadContainer/>
                    <TableBody>
                        {packs.map((pack: Pack) => (
                            <StyledTableRow key={pack._id}>
                                <TableCell component="th" scope="row">
                                    <NavLink to={'/packs/' + pack._id}>{pack.name}</NavLink>
                                </TableCell>
                                <TableCell>{pack.cardsCount}</TableCell>
                                <TableCell>{convertDate(pack.updated)}</TableCell>
                                <TableCell>{pack.user_name}</TableCell>
                                <TableCell className={s.table_icons}>
                                    <IconGroup ownerPack={pack.user_id} packId={pack._id} packName={pack.name} />
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PacksPaginationContainer/>
        </div>
    );
};

export default TablesContainer;