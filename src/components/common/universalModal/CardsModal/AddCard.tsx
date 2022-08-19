import React, { ChangeEvent, useState } from 'react';
import UniversalModal from '../UniversalModal';
import { useAppDispatch } from '../../../../store/store';
import { addNewCard } from '../../../../store/reducers/cards-reducer';
import { Button, Input, Select } from 'antd';

import s from './cards.module.css';
import { ImageLoader } from '../../imageModalLoader/ImageLoader';
import { uploadPhoto } from '../../../../utils/uploadPhoto';
import { updateUserData } from '../../../../store/reducers/authorization-reducer';

type AddCard = {
    packID: string
}

export const AddCard: React.FC<AddCard> = ({ packID }) => {
    const dispatch = useAppDispatch();
    const [cardQuestion, setCardQuestion] = useState('');
    const [cardAnswer, setCardAnswer] = useState('');

    const [questionVariant, setQuestionVariant] = useState(true)

    const handleChange = (value: string) => {
        if(value === "Text question") {
            setQuestionVariant(true)
        } else {
            setQuestionVariant(false)
        }
    };

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

    const uploadQuestionImage = (e: ChangeEvent<HTMLInputElement>) => {
        uploadPhoto(e, (file64: string) => {
            dispatch(addNewCard(packID, cardQuestion, cardAnswer, file64));
        });
    };

    const { Option } = Select;

    return (
        <UniversalModal modalName="Create new card" callBackFunction={createNewCard} clickElement={createCardBtn}>
            <Input.Group compact>
                <Select className={s.cards_modal_select} defaultValue="Text question" onChange={handleChange}>
                    <Option value="Text question">Text question</Option>
                    <Option value="Image question">Image question</Option>
                </Select>
            </Input.Group>
            {questionVariant ?
                <div>
                    <Input className={s.cards_modal_input} placeholder="Write card question"
                           onChange={onChangeCardQuestion}
                           value={cardQuestion} defaultValue="Text question"/>
                    <Input className={s.cards_modal_input} placeholder="Write card answer" onChange={onChangeCardAnswer}
                           value={cardAnswer} />
                </div>
                :
                <div>
                    <ImageLoader />
                    <input type="file" onChange={uploadQuestionImage} />
                    <Input className={s.cards_modal_input} placeholder="Write card answer" onChange={onChangeCardAnswer}
                           value={cardAnswer} />
                </div>
            }
        </UniversalModal>
    );
};
