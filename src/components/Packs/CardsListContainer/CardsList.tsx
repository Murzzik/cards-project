import React from 'react';
import { CardsType } from '../../../api/cardsAPI';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { useSearchParams } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Pagination } from 'antd';
import { Rating } from '@mui/material';
import { convertDate } from '../../../utilities/parsData';

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

const CardsList: React.FC<CardsListPropsType> = ({cards, cardsTotalCount}) => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    let page = Number(searchParameters.get('page'));
    let pageCount = Number(searchParameters.get('pageCount'));
    if(!page) page = 1;
    if(!pageCount) pageCount = 4;

    const onChangeHandlerPage = (page: number, size = 4) => {
        setSearchParameters({
            ...Object.fromEntries(searchParameters),
            pageCount: size.toString(),
            page: page.toString(),
        });
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
                                    <Rating name="half-rating-read" defaultValue={card.grade} precision={0.5}
                                            readOnly />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                total={cardsTotalCount}
                showSizeChanger
                showQuickJumper
                onChange={onChangeHandlerPage}
                defaultPageSize={pageCount}
                pageSizeOptions={[4, 10, 20]}
                defaultCurrent={page}
                showTotal={(total) => `Total ${total} items`}
                style={{
                    width: '80%',
                    margin: '0 auto',
                    color: 'white',
                    backgroundColor: 'black',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '20px',
                    textAlign: 'right',
                }}
            />
        </div>

    );
};

export default CardsList;