import React from 'react';
import {CardsType} from "../../api/cardsAPI";
import {useNavigate} from "react-router-dom";

type PropsType = {
    card: CardsType
    showAnswerHandler: () => void
}

const Question: React.FC<PropsType> = ({card, showAnswerHandler}) => {
    const navigate = useNavigate()

    return (
        <div>
            <div>
                <div>Question</div>
                {card.question}
            </div>
            <br/>

            <button style={{color: "black"}} onClick={() => navigate(-1)}>Back</button>
            <button style={{color: "black"}} onClick={showAnswerHandler}>Show Answer</button>
        </div>
    );
};

export default Question;