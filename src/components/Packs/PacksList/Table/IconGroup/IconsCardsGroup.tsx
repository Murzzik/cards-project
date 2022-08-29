import React from 'react';
import {useAppSelector} from '../../../../../store/store';
import s from '../../../CardsListContainer/CardsList.module.css';
import {EditCard} from '../../../../common/universalModal/CardsModal/EditCard';
import {DeleteCard} from '../../../../common/universalModal/CardsModal/DeleteCard';
import {FrownOutlined, MehOutlined, SmileOutlined} from '@ant-design/icons';
import {Rate} from 'antd';

type IconsCardsGroup = {
    ownerPack: string
    id: string
    question: string
    answer: string
    cardsPack_id: string
    grade: number
}

const customIcons: any = {
    1: <FrownOutlined/>,
    2: <FrownOutlined/>,
    3: <MehOutlined/>,
    4: <SmileOutlined/>,
    5: <SmileOutlined/>,
};

export const IconsCardsGroup: React.FC<IconsCardsGroup> = ({ownerPack, cardsPack_id, id, answer, question, grade}) => {
    const myId = useAppSelector(state => state.auth.user._id);

    const isMyPacks = myId === ownerPack;

    return (
        <div className={s.editRow}>
            <Rate value={grade} character={({index = grade}) => customIcons[index + 1]} disabled/>
            {isMyPacks &&
                <div className={s.iconGroup}>
                    <EditCard id={id}
                              packID={cardsPack_id}
                              questionValue={question}
                              answerValue={answer}/>
                    <DeleteCard id={id}
                                packID={cardsPack_id}
                                cardName={question}/>
                </div>
            }

        </div>
    );
};