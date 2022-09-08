import React, {ChangeEvent, useRef, useState} from 'react';
import UniversalModal from '../UniversalModal';
import {useAppDispatch} from '../../../../store/store';
import {Button, Input} from 'antd';
import s from './cards.module.css';
import {updateCard} from '../../../../store/reducers/cardsReducer';
import defaultImage from '../../../../assets/images/project-logo.png';
import {uploadPhoto} from '../../../../utils/uploadPhoto';
import {EditOutlined} from '@ant-design/icons';

type EditCard = {
    id: string
    packID: string
    questionValue: string
    answerValue: string
}

export const EditCard: React.FC<EditCard> = ({id, packID, questionValue, answerValue}) => {
    const dispatch = useAppDispatch();

    const [cardQuestion, setCardQuestion] = useState(questionValue);
    const [cardAnswer, setCardAnswer] = useState(answerValue);
    const [questionImage, setQuestionImage] = useState(defaultImage);
    const uploadRef = useRef<HTMLInputElement>(null);

    const onChangeCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setCardQuestion(e.currentTarget.value);
    };

    const onChangeCardAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setCardAnswer(e.currentTarget.value);
    };

    const editCardInformation = () => {
        dispatch(updateCard({id, question: cardQuestion, answer: cardAnswer, packID, questionImg: questionImage}));
    };

    const clearData = () => {
        setCardQuestion(questionValue);
        setCardAnswer(cardAnswer);
        setQuestionImage(defaultImage);
        if (uploadRef.current) {
            uploadRef.current.value = '';
        }
    };

    const uploadPackImage = (e: ChangeEvent<HTMLInputElement>) => {
        uploadPhoto(e, (file64: string) => {
            setQuestionImage(file64);
        });
    };

    return (
        <UniversalModal callBackFunction={editCardInformation}
                        modalName="Edit card information"
                        clickElement={
                            <Button shape="circle" icon={<EditOutlined style={{fontSize: '20px', color: 'green'}}/>}/>
                        }
                        clearData={clearData}>
            <div className={s.question_image_block}>
                <img src={questionImage} alt=""/>
                <label className="custom-file-upload">
                    <input type="file" onChange={uploadPackImage}/>
                </label>
            </div>
            <Input className={s.cards_modal_input} placeholder="Change card question" onChange={onChangeCardQuestion}
                   name={cardQuestion} value={cardQuestion}/>
            <Input className={s.cards_modal_input} placeholder="Change card answer" onChange={onChangeCardAnswer}
                   name={cardAnswer} value={cardAnswer}/>
        </UniversalModal>
    );
};