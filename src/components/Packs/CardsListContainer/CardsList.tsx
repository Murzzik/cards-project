import React from 'react';
import {CardsType} from '../../../api/cardsAPI';
import {Table} from 'antd';
import {IconsCardsGroup} from '../PacksList/Table/IconGroup/IconsCardsGroup';
import {convertDate} from '../../../utils/parsData';
import CardsPaginationContainer from './CardsPaginationContainer';
import defaultPackImage from '../../../assets/images/project-logo.png';

const columns = [
    {
        title: 'Question image',
        dataIndex: 'questionImage'
    },
    {
        title: 'Question text',
        dataIndex: 'question',
        sorter: {
            // compare: (a, b) => a.chinese - b.chinese,
            // multiple: 3,
        },
    },
    {
        title: 'Answer',
        dataIndex: 'answer',
        sorter: {
            // compare: (a, b) => a.math - b.math,
            // multiple: 2,
        },
    },
    {
        title: 'Last Update',
        dataIndex: 'update',
        sorter: {
            // compare: (a, b) => a.english - b.english,
            // multiple: 1,
        },
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        sorter: {
            compare: (a: any, b: any) => a.grade - b.grade,
            // multiple: 1,
        },
    },
];

type CardsListPropsType = {
    cards: CardsType[],
}

const CardsList: React.FC<CardsListPropsType> = ({cards}) => {

    const data = cards.map((card) => ({
        key: card._id,
        questionImage: (card.questionImg && card.questionImg.includes('data:image')) ? <img src={card.questionImg} alt="" style={{width: '100px'}}/> :
            <img src={defaultPackImage} alt="" style={{width: '100px'}}/>,
        question: card.question,
        answer: card.answer,
        update: convertDate(card.updated),
        grade: <IconsCardsGroup
            grade={card.grade}
            cardsPack_id={card.cardsPack_id}
            question={card.question}
            answer={card.answer}
            ownerPack={card.user_id}
            id={card._id}
        />

    }));

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('params', sorter);

        // pagination, filters, sorter, extra
    };

    return (
        // <div>
        //     <TableContainer component={Paper} style={{width: '80%', margin: '0 auto'}}>
        //         <Table sx={{minWidth: 700}} aria-label="customized table">
        //             <TableHead>
        //                 <TableRow>
        //                     <StyledTableCell align="left">Question image</StyledTableCell>
        //                     <StyledTableCell>
        //                         <span style={{cursor: 'pointer'}}>Question text</span>
        //                     </StyledTableCell>
        //                     <StyledTableCell align="right">Answer</StyledTableCell>
        //                     <StyledTableCell align="right">Last Update</StyledTableCell>
        //                     <StyledTableCell align="right">Grade</StyledTableCell>
        //                 </TableRow>
        //             </TableHead>
        //             <TableBody>
        //                 {cards.map((card) => (
        //                     <StyledTableRow key={card._id}>
        //                         <StyledTableCell component="th" scope="row">
        //                             {
        //                                 (card.questionImg && card.questionImg.includes('data:image')) ?
        //                                 <img className={s.question_image} src={card.questionImg} alt="Personal question image" />
        //                                 :
        //                                 <img className={s.question_image_default} src={defaultImage} alt="Default question image" />
        //                             }
        //                         </StyledTableCell>
        //                         <StyledTableCell component="th" scope="row">{card.question}</StyledTableCell>
        //                         <StyledTableCell align="right">{card.answer}</StyledTableCell>
        //                         <StyledTableCell align="right">{convertDate(card.updated)}</StyledTableCell>
        //                         <StyledTableCell align="right">
        //                             <div className={s.editRow}>
        //                                 <IconsCardsGroup ownerPack={card.user_id}
        //                                                  cardsPack_id={card.cardsPack_id}
        //                                                  question={card.question}
        //                                                  answer={card.answer}
        //                                                  id={card._id}
        //                                                  grade={card.grade}/>
        //                             </div>
        //                         </StyledTableCell>
        //                     </StyledTableRow>
        //                 ))}
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        //     <CardsPaginationContainer />
        // </div>
        <div>
            <Table columns={columns}
                   dataSource={data}
                   onChange={onChange}
                   style={{width: '80%', margin: '0 auto'}}
                   pagination={false}

            />
            <CardsPaginationContainer/>
        </div>
    );
};

export default CardsList;