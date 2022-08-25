import {instance} from './instance';
import {Pack} from '../store/reducers/packs-reducer';
import {GetCardsResponseType} from './cardsAPI';

export const packAPI = {
    getPacks(args: GetPackType) {
        return instance.get<GetCardsPackResponseType>('cards/pack', {params: args});
    },
    addNewPack(name: string, visibility: boolean, deckCover?: string) {
        return instance.post<GetCardsPackResponseType>('cards/pack', {cardsPack: {name, private: visibility, deckCover}});
    },
    deletePack(id: string) {
        return instance.delete<GetCardsResponseType>('/cards/pack', {params: {id}});
    },
    updatePack(_id: string, name: string, visibility: boolean, deckCover?: string) {
        return instance.put<GetCardsResponseType>('/cards/pack', {cardsPack: {_id, name, private: visibility, deckCover}});
    },
};

export type AddNewCardType = {
    name: string
    deckCover?: string
    private?: boolean
}

export type GetPackType = {
    packName?: string | null
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string | null
}
export type GetCardsPackResponseType = {
    cardPacks: Pack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}