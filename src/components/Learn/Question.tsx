import React from 'react';
import { CardsType } from '../../api/cardsAPI';
import { useNavigate } from 'react-router-dom';
import s from './Learn.module.css';

type PropsType = {
    card: CardsType
    showAnswerHandler: () => void
}

const Question: React.FC<PropsType> = ({card, showAnswerHandler}) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className={s.question_block}>
                <span>Question:</span>
                <span>❔{card.question}</span>
            </div>
            <br />
            <div className={s.learn_btn_block}>
                <button style={{color: 'black'}} onClick={() => navigate(-1)}>Back</button>
                <button style={{color: 'black'}} onClick={showAnswerHandler}>Show Answer</button>
            </div>
        </div>
    );
};

export default Question;