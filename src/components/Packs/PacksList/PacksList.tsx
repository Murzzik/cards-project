import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Pack} from '../../../store/reducers/packs-reducer';
import {NavLink} from 'react-router-dom';

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

type PackListPopsType = {
    packs: Pack[],
}

export const PackList: React.FC<PackListPopsType> = ({packs}) => {

    return (
        <TableContainer component={Paper} style={{width: '80%', margin: '0 auto'}}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <span style={{cursor: 'pointer'}}>Name</span>
                        </StyledTableCell>
                        <StyledTableCell align="right">Cards</StyledTableCell>
                        <StyledTableCell align="right">Last Update</StyledTableCell>
                        <StyledTableCell align="right">Create By</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((pack) => (
                        <StyledTableRow key={pack._id}>
                            <StyledTableCell component="th" scope="row">
                                <NavLink to={'/packs/' + pack._id}>{pack.name}</NavLink>
                            </StyledTableCell>
                            <StyledTableCell align="right">{pack.cardsCount}</StyledTableCell>
                            <StyledTableCell align="right">{pack.updated}</StyledTableCell>
                            <StyledTableCell align="right">{pack.user_name}</StyledTableCell>
                            <StyledTableCell align="right">..............icons</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default PackList;
