import {instance} from './instance';
import {Pack} from '../store/reducers/packs-reducer';
import {GetCardsResponseType} from './cardsAPI';

export const packAPI = {
    getPacks(args: GetCardsType) {
        return instance.get<GetCardsPackResponseType>('cards/pack', {params: args});
    },
    addNewPack(name: string, visibility: boolean) {
        return instance.post<GetCardsPackResponseType>('cards/pack', {cardsPack: {name, private: visibility}});
    },
    deletePack(id: string) {
        return instance.delete<GetCardsResponseType>('/cards/pack', {params: {id}});
    },
    updatePackName(_id: string, name: string) {
        return instance.put<GetCardsResponseType>('/cards/pack', {cardsPack: {_id, name}});
    },
};

export type AddNewCardType = {
    name: string
    deckCover?: string
    private?: boolean
}

export type GetCardsType = {
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