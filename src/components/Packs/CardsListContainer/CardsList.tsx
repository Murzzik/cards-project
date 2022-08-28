import React from 'react';
import {CardsType} from '../../../api/cardsAPI';
import {Table} from 'antd';
import {IconsCardsGroup} from '../PacksList/Table/IconGroup/IconsCardsGroup';
import {convertDate} from '../../../utils/parsData';
import CardsPaginationContainer from './CardsPaginationContainer';
import defaultPackImage from '../../../assets/images/project-logo.png';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {setCardsParameter} from '../../../store/reducers/cardsParametersReducer';
import {useParams} from 'react-router-dom';

const columns = [
    {
        title: 'Question image',
        dataIndex: 'questionImage'
    },
    {
        title: 'Question text',
        dataIndex: 'question',
        sorter: {},
    },
    {
        title: 'Answer',
        dataIndex: 'answer',
        sorter: {},
    },
    {
        title: 'Last Update',
        dataIndex: 'updated',
        sorter: {},
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        sorter: {
            // compare: (a: any, b: any) => a.grade - b.grade,
            // multiple: 1,
        },
    },
];

type CardsListPropsType = {
    cards: CardsType[],
}

const CardsList: React.FC<CardsListPropsType> = ({cards}) => {
    const dispatch = useAppDispatch();
    const parameters = useAppSelector(state => state.cardsParameter);
    const {cardsPack_id} = useParams();
    const data = cards.map((card) => ({
        key: card._id,
        questionImage:
            (card.questionImg && card.questionImg.includes('data:image')) ?
                <img src={card.questionImg} alt="" style={{width: '100px'}}/>
                :
                <img src={defaultPackImage} alt="" style={{width: '100px'}}/>,
        question: card.question,
        answer: card.answer,
        updated: convertDate(card.updated),
        grade: <IconsCardsGroup
            grade={card.grade}
            cardsPack_id={card.cardsPack_id}
            question={card.question}
            answer={card.answer}
            ownerPack={card.user_id}
            id={card._id}
        />

    }));

    const onChange = (pagination: any, filters: any, sorter: any) => {
        const sortCards = `${sorter.order === 'ascend' ? '0' : '1'}${sorter.field}`;
        if (sorter.order && cardsPack_id) {
            console.log(parameters);
            dispatch(setCardsParameter({parameters: {...parameters, sortCards, cardsPack_id}}));
        }
    };

    return (
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