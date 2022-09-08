import React from 'react';
import {CardsType} from '../../../api/cardsAPI';
import {Table} from 'antd';
import {IconsCardsGroup} from '../PacksList/Table/IconGroup/IconsCardsGroup';
import {convertDate} from '../../../utils/parsData';
import defaultPackImage from '../../../assets/images/project-logo.png';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {setCardsParameter} from '../../../store/reducers/cardsParametersReducer';
import {useParams} from 'react-router-dom';

const columns = [
    {
        title: 'Question image',
        dataIndex: 'questionImage',
        width: '130px'
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
        width:'30px'
    },
    {
        title: 'Last Update',
        dataIndex: 'updated',
        sorter: {},
        width:'150px'
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        sorter: {
            // compare: (a: any, b: any) => a.grade - b.grade,
            // multiple: 1,
        },
        width:'250px'
    },
];

type CardsListPropsType = {
    cards: CardsType[],
}

const CardsList: React.FC<CardsListPropsType> = ({cards}) => {
    const {cardsPack_id} = useParams();
    const dispatch = useAppDispatch();
    const parameters = useAppSelector(state => state.cardsParameter);
    const totalItems = useAppSelector(state => state.cards.cardsTotalCount);

    const data = cards.map((card) => ({
        key: card._id,
        questionImage:
            (card.questionImg && card.questionImg.includes('data:image')) ?
                <img src={card.questionImg} alt="" style={{width: '100px'}}/>
                :
                <img src={defaultPackImage} alt="" style={{width: '100px'}}/>,
        question: card.question,
        answer: card.answer,
        updated: <div>
            <p>{convertDate(card.updated)[0]}  {convertDate(card.updated)[1]}</p>
            {/*<p>{convertDate(pack.updated)[1]}</p>*/}
        </div>,
        grade: <IconsCardsGroup
            grade={card.grade}
            cardsPack_id={card.cardsPack_id}
            question={card.question}
            answer={card.answer}
            ownerPack={card.user_id}
            id={card._id}
        />

    }));
    const showTotal = (totalItems: number) => `Total ${totalItems} items`;
    const onChange = (pagination: any, filters: any, sorter: any) => {

        const sortCards = `${sorter.order === 'ascend' ? '0' : '1'}${sorter.field}`;
        if (sorter.order && cardsPack_id) {
            console.log(parameters);
            dispatch(setCardsParameter({parameters: {...parameters, sortCards, cardsPack_id}}));
        }
    };

    const changeCardsPaginationData = (page: number, pageCount: number) => {
        if (cardsPack_id) {
            dispatch(setCardsParameter({parameters: {...parameters, page, pageCount, cardsPack_id}}));
        }
    };

    return (
        <Table columns={columns}
               dataSource={data}
               onChange={onChange}
               size={'small'}
               style={{width: '80%', margin: '0 auto'}}
               pagination={{
                   size: 'small',
                   total: totalItems,
                   showTotal: showTotal,
                   current: parameters.page,
                   onChange: changeCardsPaginationData,
                   defaultPageSize: 4,
                   pageSizeOptions: [4, 10, 20, 50],
                   showQuickJumper: true,
                   showSizeChanger: true
               }}
        />
    );
};

export default CardsList;