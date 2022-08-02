import {GetCardsType, packAPI} from '../../api/packAPI';
import {AppThunk} from '../store';

const initialState: initialStateType = {
    cardPacks: [],
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 5945,
    minCardsCount: 0,
    maxCardsCount: 110,
    isLoading: false
};

export const packsReducer = (state = initialState, action: ActionTypeForPacksReducer): initialStateType => {
    switch (action.type) {
        case 'packs-setPacksData': {
            return action.packsData;
        }
        default:
            return state;
    }
};

export const setPacksData = (packsData: initialStateType) => {
    return {type: 'packs-setPacksData', packsData};
};

export const initializedPacks = (args: GetCardsType = {}): AppThunk => (dispatch) => {
    packAPI.getPacks(args).then(res => {
        dispatch(setPacksData(res.data));
    });
};

type initialStateType = {
    cardPacks: Pack[],
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    token?: string,
    tokenDeathTime?: number,
    isLoading?: boolean,
}

export type Pack = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number
}

export type ActionTypeForPacksReducer = ReturnType<typeof setPacksData>