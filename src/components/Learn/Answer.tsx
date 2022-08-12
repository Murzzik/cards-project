import React from 'react';
import {CardsType} from "../../api/cardsAPI";
import RadioForm from "./RadioForm";
import {useNavigate} from "react-router-dom";

type PropsType = {
    card: CardsType
    setGradeToState: (e: React.ChangeEvent<HTMLInputElement>) => void
    getNewRandomCard: () => void
}

const Answer: React.FC<PropsType> = ({card, getNewRandomCard,setGradeToState}) => {
    const navigate = useNavigate()
    return (
        <div>
            <div>
                <div>Question</div>
                {card.question}
            </div>

            <div>Answer
                <div>{card.answer}</div>
            </div>

            <div>
                Rate yourself
            </div>

            <RadioForm radioFromHandler={setGradeToState}/>
            <button style={{color: "black"}} onClick={() => navigate(-1)}>Back</button>
            <button style={{color: "black"}} onClick={getNewRandomCard}>Next
            </button>

        </div>
    );
};

export default Answer;