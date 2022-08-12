import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getAllCardsFromPackToLearn} from "../../store/reducers/learnReducer";
import Preloader from "../common/Preloader/Preloader";
import {createArrayWithRandomCoefficient, getRandomCard} from "../../utilities/cards";
import LearnPage from './LearnPage';
import {CardsType} from "../../api/cardsAPI";


type PropsType = {}

const LearnContainer: React.FC<PropsType> = () => {
    const {cardsPack_id} = useParams()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isLoading = useAppSelector(state => state.app.status) === 'loading'
    const cards = useAppSelector(state => state.learn.cards)
    const [randomCard, setNewRandomCard] = useState<CardsType | undefined>()

    useEffect(() => {
        cardsPack_id ? dispatch(getAllCardsFromPackToLearn(cardsPack_id))
            : alert('выберите колоду')
    }, [cardsPack_id])

    const cardsArrayWithRandomCoefficient = useMemo( () =>createArrayWithRandomCoefficient(cards),[cards] )
    const getNewRandomCard = () => {
        setNewRandomCard({...getRandomCard(cardsArrayWithRandomCoefficient)})
    }

    return !isLoading
        ? <div style={{color: 'white'}}>
            <LearnPage originalCards={cards} getNewRandomCard={getNewRandomCard} card={randomCard}/>
        </div>
        : <Preloader/>
}

export default LearnContainer