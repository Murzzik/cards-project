import {CardsType} from "../api/cardsAPI";

//This function is create array of Cards with random coefficient
export const createArrayWithRandomCoefficient = (cards: CardsType[]): CardsType[] => {
    const cardsCoefficient: CardsType[] = []
    cards.forEach(card => {
        let coefficient = Math.round(card.grade)
        if (!coefficient || coefficient < 0) {
            coefficient = 0
        }
        for (let i = 0; i < 6 - coefficient; i++) {
            cardsCoefficient.push(card)
        }
    })
    return cardsCoefficient
}

//This function is return random card from entering array
export const getRandomCard = (cards: CardsType[]): CardsType => {
    let rand = 0 - 0.5 + Math.random() * (cards.length)
    return cards[Math.round(rand)]
}