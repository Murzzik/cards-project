import React from 'react';
import { CardsType } from '../../../api/cardsAPI';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { convertDate } from '../../../utils/parsData';
import s from './CardsList.module.css';
import CardsPaginationContainer from './CardsPaginationContainer';
import { IconsCardsGroup } from '../PacksList/Table/IconGroup/IconsCardsGroup';

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
}

const CardsList: React.FC<CardsListPropsType> = ({cards}) => {
    return (
        <div>
            <TableContainer component={Paper} style={{width: '80%', margin: '0 auto'}}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Question image</StyledTableCell>
                            <StyledTableCell>
                                <span style={{cursor: 'pointer'}}>Question text</span>
                            </StyledTableCell>
                            <StyledTableCell align="right">Answer</StyledTableCell>
                            <StyledTableCell align="right">Last Update</StyledTableCell>
                            <StyledTableCell align="right">Grade</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((card) => (
                            <StyledTableRow key={card._id}>
                                <StyledTableCell component="th" scope="row"><img className={s.pack_image} src={card.questionImg} alt="" /></StyledTableCell>
                                <StyledTableCell component="th" scope="row">{card.question}</StyledTableCell>
                                <StyledTableCell align="right">{card.answer}</StyledTableCell>
                                <StyledTableCell align="right">{convertDate(card.updated)}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className={s.editRow}>
                                        <IconsCardsGroup ownerPack={card.user_id}
                                                         cardsPack_id={card.cardsPack_id}
                                                         question={card.question}
                                                         answer={card.answer}
                                                         id={card._id}
                                                         grade={card.grade}/>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CardsPaginationContainer />
        </div>

    );
};

export default CardsList;