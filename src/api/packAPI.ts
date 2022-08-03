import {instance} from './instance';
import {Pack} from '../store/reducers/packs-reducer';

export const packAPI = {
    getPacks(args: GetCardsType) {
        return instance.get<GetCardsPackResponseType>('cards/pack', {params: args});
    },
};

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