import React from 'react';
import {CardsType} from '../../../api/cardsAPI';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {Rating} from '@mui/material';
import {convertDate} from '../../../utilities/parsData';
import {deleteCard, updateCard} from '../../../store/reducers/cards-reducer';
import {useAppDispatch} from '../../../store/store';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {IconButton} from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import s from './CardsList.module.css';
import CardsPaginationContainer from './CardsPaginationContainer';

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

type CardsListPropsType = {
    cards: CardsType[],
    cardsTotalCount: number,
}

const CardsList: React.FC<CardsListPropsType> = ({cards}) => {
    const dispatch = useAppDispatch();
    const deleteCardHandler = (id: string, packID: string) => {
        dispatch(deleteCard(id, packID));
    };

    const updateCardHandler = (id: string, packID: string) => {
        const newQuestion = 'Test for name change before modal implemented';
        dispatch(updateCard(id, newQuestion, packID));
    };

    return (
        <div>
            <TableContainer component={Paper} style={{width: '80%', margin: '0 auto'}}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <span style={{cursor: 'pointer'}}>Question</span>
                            </StyledTableCell>
                            <StyledTableCell align="right">Answer</StyledTableCell>
                            <StyledTableCell align="right">Last Update</StyledTableCell>
                            <StyledTableCell align="right">Grade</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((card) => (
                            <StyledTableRow key={card._id}>
                                <StyledTableCell component="th" scope="row">{card.question}</StyledTableCell>
                                <StyledTableCell align="right">{card.answer}</StyledTableCell>
                                <StyledTableCell align="right">{convertDate(card.updated)}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className={s.editRow}>
                                        <IconButton>
                                            <EditIcon onClick={() => {
                                                updateCardHandler(card._id, card.cardsPack_id);
                                            }}/>
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            deleteCardHandler(card._id, card.cardsPack_id);
                                        }}>
                                            <DeleteForeverIcon/>
                                        </IconButton>
                                        <Rating name="half-rating-read" defaultValue={card.grade} precision={0.5}
                                                readOnly/>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CardsPaginationContainer/>
        </div>

    );
};

export default CardsList;