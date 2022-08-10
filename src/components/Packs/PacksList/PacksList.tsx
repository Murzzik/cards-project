import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {deletePack, Pack, updatePackName} from '../../../store/reducers/packs-reducer';
import {NavLink} from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {convertDate} from '../../../utilities/parsData';
import s from './PackList.module.css';
import PacksPaginationContainer from './PacksPaginationContainer';
import PacksTableHeadContainer from "../PacksTableHeadContainer";

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

type PackListPopsType = {}

export const PackList: React.FC<PackListPopsType> = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const packs = useAppSelector(state => state.packs.cardPacks);

    const myId = useAppSelector(state => state.auth.user._id);

    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id));
    };
    const updatePackNameHandler = (id: string) => {
        const newPackName = 'Test for name change before modal implemented';
        dispatch(updatePackName(id, newPackName));
    };

    return (
        <div>{packs.length > 0 ?
            <div>
                {!isLoggedIn ?
                    <h3 className={s.errorAuthText}>Ты не авторизирован, попробуй перезайти:)</h3>
                    :
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
                                        <TableCell>
                                            {myId === pack.user_id ?
                                                <div>
                                                    <IconButton>
                                                        <SchoolIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={() => deletePackHandler(pack._id)}>
                                                        <DeleteForeverIcon/>
                                                    </IconButton>
                                                    <IconButton>
                                                        <EditIcon onClick={() => updatePackNameHandler(pack._id)}/>
                                                    </IconButton>
                                                </div>
                                                :
                                                <div>
                                                    <IconButton>
                                                        <SchoolIcon/>
                                                    </IconButton>
                                                </div>
                                            }
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                <PacksPaginationContainer/>
            </div>
            : <h3 style={{fontSize: '50px', color: 'white', textAlign: 'center'}}>Возможно паки ещё не загрузились,
                ожидайте...</h3>}

        </div>
    );
};
export default PackList;
