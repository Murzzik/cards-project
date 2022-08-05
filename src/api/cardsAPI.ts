import { instance } from './instance';

export const cardsAPI = {
    getCards: (args: GetCardType) => {
        return instance.get<GetCardsResponseType>('/cards/card', {params: args});
    },
    addNewCard: (cardsPack_id: string, question: string, answer: string) => {
        return instance.post<GetCardsResponseType>('/cards/card', {card: {cardsPack_id, question, answer}});
    },
    deleteCard: (id: string) => {
        return instance.delete<GetCardsResponseType>(`/cards/card?id=${id}`);
    },
    updateCard: (_id: string, question: string) => {
        return instance.put<GetCardsResponseType>('/cards/card', {card: {_id, question}});
    },
};

export type GetCardType = {
    cardAnswer?: string
    cardQuestion?: string | null
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
    pageCount: number
    packUserId: string
}

