import {instance} from './instance';

export const cardsAPI = {
    getCards: (args: GetCardType) => {
        return instance.get<GetCardsResponseType>('/cards/card', {params: args});
    },
};

export type GetCardType = {
    cardAnswer?: string
    cardQuestion?: string | null
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: Date
    updated: Date
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

