import { instance } from './instance';

export const cardsAPI = {
    getCards: (args: GetCardType) => {
        return instance.get<GetCardsResponseType>('/cards/card', {params: args});
    },
    addNewCard: (cardsPack_id: string, question: string, answer: string, questionImg?: string) => {
        return instance.post<GetCardsResponseType>('/cards/card', {card: {cardsPack_id, question, answer, questionImg}});
    },
    addQuestionImage: (cardsPack_id: string, questionImg?: string) => {
        return instance.post<GetCardsResponseType>('/cards/card', {card: {cardsPack_id, questionImg}});
    },
    deleteCard: (id: string) => {
        return instance.delete<GetCardsResponseType>(`/cards/card?id=${id}`);
    },
    updateCard: (_id: string, question: string, answer: string, questionImg?:string) => {
        return instance.put<GetCardsResponseType>('/cards/card', {card: {_id, question, answer, questionImg}});
    },
    gradeCard: (card: CardToBeGraded) => {
        console.log(card)
        return instance.put<CardToBeGraded>('/cards/grade', card)
    }
};

export type GetCardType = {
    cardAnswer?: string
    cardQuestion?: string
    questionImg?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number | null | undefined
    pageCount?: number | null | undefined
}
export type CardsType = {
    answer: string
    question: string
    questionImg?: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type GetCardsResponseType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    packDeckCover: string
    packName: string
    pageCount: number
    packUserId: string
}

export type CardToBeGraded = {
    grade: number
    card_id: string
}
