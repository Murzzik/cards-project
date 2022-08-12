import React, { ChangeEvent, useState } from 'react';
import UniversalModal from '../UniversalModal';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../../../store/store';
import { Input } from 'antd';
import s from './cards.module.css';
import { updateCard } from '../../../../store/reducers/cards-reducer';

type EditCard = {
    id: string
    packID: string

}

export const EditCard: React.FC<EditCard> = ({id, packID}) => {
    const dispatch = useAppDispatch();

    const [cardQuestion, setCardQuestion] = useState('');
    const [cardAnswer, setCardAnswer] = useState('');

    const onChangeCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setCardQuestion(e.currentTarget.value);
    };

    const onChangeCardAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setCardAnswer(e.currentTarget.value);
    };

    const editCardInformation = () => {
        dispatch(updateCard(id, cardQuestion, cardAnswer, packID));
    };

    return (
        <UniversalModal callBackFunction={editCardInformation} modalName="Edit card information">
            <Input className={s.cards_modal_input} placeholder="Change card question" onChange={onChangeCardQuestion}
                   name={cardQuestion} />
            <Input className={s.cards_modal_input} placeholder="Change card answer" onChange={onChangeCardAnswer}
                   name={cardAnswer} />
        </UniversalModal>
    );
};