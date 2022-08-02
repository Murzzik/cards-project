import {GetCardsType} from '../../api/packAPI';
import {AppThunk} from '../store';

const initialState: initialStateType = {
    cardPacks: [] ,
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 5945,
    minCardsCount: 0,
    maxCardsCount: 110,
    isLoading: false
};

export const packsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const setPacks =(args:GetCardsType): AppThunk=>(dispatch)=>{

}

type initialStateType = {
    cardPacks: Pack[],
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    token?: string,
    tokenDeathTime?: number,
    isLoading: boolean,
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