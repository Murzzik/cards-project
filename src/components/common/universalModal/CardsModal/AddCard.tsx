import React, { ChangeEvent, useState } from 'react';
import UniversalModal from '../UniversalModal';
import { useAppDispatch } from '../../../../store/store';
import { addNewCard } from '../../../../store/reducers/cards-reducer';
import { uploadPhoto } from '../../../../utils/uploadPhoto';

import { Button, Input, Select } from 'antd';
import s from './cards.module.css';
import baseQuestionImage from '../../../../assets/images/questionImagePlug.png'


type AddCard = {
    packID: string
}

export const AddCard: React.FC<AddCard> = ({ packID }) => {
    const dispatch = useAppDispatch();
    const [cardQuestion, setCardQuestion] = useState('');
    const [cardAnswer, setCardAnswer] = useState('');
    const [questionVariant, setQuestionVariant] = useState(true)
    const [questionImage, setQuestionImage] = useState('')


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

    const uploadQuestionImage = (e: ChangeEvent<HTMLInputElement>) => {
        uploadPhoto(e, (file64: string) => {
            setQuestionImage(file64)
        });
        console.log(questionImage)
    };

    const createNewCard = () => {
        dispatch(addNewCard(packID, cardQuestion, cardAnswer, questionImage));
        setCardQuestion('');
        setCardAnswer('');
        setQuestionImage('');
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
                <div className={s.question_image_block}>
                    <img src={questionImage} alt=""/>
                    {/*// @ts-ignore*/}
                    <label className="custom-file-upload">
                        <input type="file" onChange={uploadQuestionImage} />
                        Upload image
                    </label>
                    <Input className={s.cards_modal_input} placeholder="Write card question" onChange={onChangeCardQuestion}
                           value={cardQuestion} />
                    <Input className={s.cards_modal_input} placeholder="Write card answer" onChange={onChangeCardAnswer}
                           value={cardAnswer} />
                </div>
            }
        </UniversalModal>
    );
};
