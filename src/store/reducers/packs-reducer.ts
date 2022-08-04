import { AddNewCardType, GetCardsType, packAPI } from '../../api/packAPI';
import { AppThunk } from '../store';
import { setError, setPreloaderStatus } from './app-reducer';

const initialState: initialStateType = {
    cardPacks: [],
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    isLoading: false,
};

export const packsReducer = (state = initialState, action: ActionTypeForPacksReducer): initialStateType => {
    switch(action.type) {
        case 'packs-setPacksData': {
            return { ...action.packsData };
        }
        default:
            return state;
    }
};

export const setPacksData = (packsData: initialStateType) => {
    return { type: 'packs-setPacksData', packsData };
};

export const initializedPacks = (args: GetCardsType = {}): AppThunk => (dispatch) => {
    packAPI.getPacks(args).then(res => {
        dispatch(setPacksData(res.data));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
};

export const addNewPack = (name: string): AppThunk => (dispatch, getState) => {
    const id = getState().auth.user._id
    dispatch(setPreloaderStatus('loading'));
    packAPI.addNewPack(name).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        dispatch(initializedPacks({user_id: id}))
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
};

export const deletePack = (id: string): AppThunk => (dispatch, getState) => {
    console.log(id)
    const userId = getState().auth.user._id
    dispatch(setPreloaderStatus('loading'));
    packAPI.deleteCard(id).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        dispatch(initializedPacks({user_id: userId}))
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
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