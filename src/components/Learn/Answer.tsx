import React from 'react';
import { CardsType } from '../../api/cardsAPI';
import RadioForm from './RadioForm';
import { useNavigate } from 'react-router-dom';

import s from './Learn.module.css';

type PropsType = {
    card: CardsType
    setGradeToState: (e: React.ChangeEvent<HTMLInputElement>) => void
    getNewRandomCard: () => void
}

const Answer: React.FC<PropsType> = ({card, getNewRandomCard, setGradeToState}) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className={s.question_block}>
                <span className={s.hide_span}>Question:</span>
                <span>{card.question}</span>
            </div>️
            <div className={s.answer_block}>
                <span className={s.hide_span}>Answer:</span>
                <span>{card.answer}</span>
            </div>

            <div className={s.rate_your_self}>
                <span className={s.rate_span}>How do you feel after this question?</span>
                <RadioForm radioFromHandler={setGradeToState} />
            </div>
            <div className={s.learn_btn_block}>
                <button style={{color: 'black'}} onClick={() => navigate(-1)}>Back</button>
                <button style={{color: 'black'}} onClick={getNewRandomCard}>Next</button>
            </div>
        </div>
    );
};

export default Answer;