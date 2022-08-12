import React, {useEffect, useState} from 'react';
import {CardsType} from "../../api/cardsAPI";
import Question from "./Question";
import Answer from "./Answer";
import {gradeCard} from "../../store/reducers/learnReducer";
import {useAppDispatch} from "../../store/store";

type PropsType = {
    getNewRandomCard: () => void
    card: CardsType | undefined
    originalCards: CardsType[]
}

const LearnPage: React.FC<PropsType> = ({getNewRandomCard, card, originalCards}) => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const [grade, setGrade] = useState<number>(1)

    const dispatch = useAppDispatch()

    useEffect(() => {
        getNewRandomCard()
    }, [originalCards])

    const getNextCard = () => {
        getNewRandomCard()
        setShowAnswer(false)
        card && dispatch( gradeCard({card_id: card._id, grade}))
    }
    const setGradeToState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrade(+e.currentTarget.value)
    }
    const showAnswerHandler = () => {
        setShowAnswer(true)
    }

    return card && card._id ?
        <div>
            {!showAnswer
                ? <Question card={card} showAnswerHandler={showAnswerHandler}/>
                : <Answer getNewRandomCard={getNextCard} card={card} setGradeToState={setGradeToState}/>}

        </div>
        : <div>Ой, куда-то все пропало...</div>

};

export default LearnPage;