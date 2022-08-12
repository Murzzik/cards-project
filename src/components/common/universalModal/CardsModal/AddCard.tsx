import React, { ChangeEvent, useState } from 'react';
import UniversalModal from '../UniversalModal';
import { useAppDispatch } from '../../../../store/store';
import { addNewCard } from '../../../../store/reducers/cards-reducer';
import { Button, Input } from 'antd';

import s from './cards.module.css';

type AddCard = {
    packID: string
}

export const AddCard: React.FC<AddCard> = ({packID}) => {
    const dispatch = useAppDispatch();
    const [cardQuestion, setCardQuestion] = useState('');
    const [cardAnswer, setCardAnswer] = useState('');

    const onChangeCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setCardQuestion(e.currentTarget.value);
    };

    const onChangeCardAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setCardAnswer(e.currentTarget.value);
    };

    const createCardBtn = <Button type="primary">Create new card</Button>;

    const createNewCard = () => {
        dispatch(addNewCard(packID, cardQuestion, cardAnswer));
        setCardQuestion('');
        setCardAnswer('');
    };

    return (
        <UniversalModal modalName="Create new card" callBackFunction={createNewCard} clickElement={createCardBtn}>
            <Input className={s.cards_modal_input} placeholder="Write card question" onChange={onChangeCardQuestion}
                   name={cardQuestion} />
            <Input className={s.cards_modal_input} placeholder="Write card answer" onChange={onChangeCardAnswer}
                   name={cardAnswer} />
        </UniversalModal>
    );
};
