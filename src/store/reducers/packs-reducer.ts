import {GetCardsPackResponseType, GetCardsType, packAPI} from '../../api/packAPI';
import {AppThunk} from '../store';
import {setError, setPreloaderStatus} from './app-reducer';
import {setIsLoggedIn} from './authorization-reducer';

const initialState: initialStateType = {
    cardPacks: [],
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    isLoading: false,
    triggerAddNewPack: false,
    triggerUpdatePack: false
};

export const packsReducer = (state = initialState, action: ActionTypeForPacksReducer): initialStateType => {
    switch (action.type) {
        case 'packs-setPacksData': {
            return {...action.packsData};
        }
        case 'packs-setTriggerForAddNewPackL': {
            return {...state, triggerAddNewPack: !state.triggerAddNewPack};
        }
        case 'packs-setTriggerForDeletePack': {
            return {...state, triggerUpdatePack: !state.triggerUpdatePack};
        }
        default:
            return state;
    }
};

export const setPacksData = (packsData: GetCardsPackResponseType) => {
    return {type: 'packs-setPacksData', packsData} as const;
};

export const setTriggerForAddNewPack = () => {
    return {type: 'packs-setTriggerForAddNewPackL'} as const;
};

export const setTriggerForUpdatePack = () => {
    return {type: 'packs-setTriggerForDeletePack'} as const;
};

export const initializedPacks = (args: GetCardsType = {}): AppThunk => (dispatch) => {
    packAPI.getPacks(args).then(res => {
        dispatch(setPacksData(res.data));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        dispatch(setIsLoggedIn(false));
        if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\\\') {
            dispatch(setIsLoggedIn(false));
        }
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
};

//TODO: When you in "MY PACKS" and try to delete or add packs, you wont be redirected to "ALL PACKS" - NEED TO FIX

export const addNewPack = (name: string, id = ''): AppThunk => (dispatch, getState) => {
    const pageCount = getState().packs.pageCount;
    const page = getState().packs.page;
    dispatch(setPreloaderStatus('loading'));
    packAPI.addNewPack(name).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        // dispatch(initializedPacks({user_id: id, pageCount}));
       if (page>1) {
           dispatch(setTriggerForAddNewPack());
       }
       else {
           dispatch(initializedPacks({user_id: id, pageCount}));
       }
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
};

export const deletePack = (id: string, userId = ''): AppThunk => (dispatch, getState) => {
    let page = getState().packs.page;
    const pageCount = getState().packs.pageCount;
    const items = getState().packs.cardPacks.length;
    if (items === 1) {
        page = page - 1;
    }
    dispatch(setPreloaderStatus('loading'));
    packAPI.deletePack(id).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        dispatch(initializedPacks({user_id: userId, page, pageCount}));

    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
};

export const updatePackName = (id: string, name: string, userId = ''): AppThunk => (dispatch, getState) => {
    const pageCount = getState().packs.pageCount;
    const page = getState().packs.page;
    dispatch(setPreloaderStatus('loading'));
    packAPI.updatePackName(id, name).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        // dispatch(initializedPacks({user_id: userId, pageCount}));
        // dispatch(setTriggerForUpdatePack());
        if (page>1) {
            dispatch(setTriggerForUpdatePack());
        }
        else {
            dispatch(initializedPacks({user_id: userId, pageCount}));
        }
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
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
    triggerAddNewPack?: boolean
    triggerUpdatePack?: boolean
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

export type ActionTypeForPacksReducer = ReturnType<typeof setPacksData> | ReturnType<typeof setTriggerForAddNewPack> | ReturnType<typeof setTriggerForUpdatePack>