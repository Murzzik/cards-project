import {GetCardsPackResponseType, GetPackType, packAPI} from '../../api/packAPI';
import {AppThunk} from '../store';
import {setError, setPreloaderStatus} from './appReducer';
import {setIsLoggedIn} from './authorizationReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    cardPacks: [] as Pack[],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    // isLoading: false,
};

const slice = createSlice({
    name: 'packs',
    initialState,
    reducers: {
        setPacksData(state, action: PayloadAction<{ parameters: { packsData: GetCardsPackResponseType } }>) {
            return state = {...action.payload.parameters.packsData};
        }
    }
});

export const packsReducer = slice.reducer;
export const {setPacksData} = slice.actions;

// export const packsReducer = (state = initialState, action: ActionTypeForPacksReducer): initialStateType => {
//     switch (action.type) {
//         case 'packs-setPacksData': {
//             return {...action.packsData};
//         }
//         default:
//             return state;
//     }
// };

// export const setPacksData = (packsData: GetCardsPackResponseType) => {
//     return {type: 'packs-setPacksData', packsData} as const;
// };

export const initializedPacks = (args: GetPackType = {}): AppThunk => (dispatch, getState) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    packAPI.getPacks(args).then(res => {
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        dispatch(setPacksData({parameters: {packsData: res.data}}));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        dispatch(setIsLoggedIn({parameter: {value: false}}));
        if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\\\') {
            dispatch(setIsLoggedIn({parameter: {value: false}}));
        }
        alert(error);
        dispatch(setError({parameter: {error}}));
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

//TODO: When you in "MY PACKS" and try to delete or add packs, you wont be redirected to "ALL PACKS" - NEED TO FIX

export const addNewPack = (name: string, visibility = false, deckCover?: string): AppThunk => (dispatch, getState) => {
    const user_id = getState().packsParameter.user_id;
    const pageCount = getState().packsParameter.pageCount;
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    packAPI.addNewPack(name, visibility, deckCover).then((res) => {
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        dispatch(initializedPacks({user_id, pageCount}));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError({parameter: {error}}));
        alert(error);
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

export const deletePack = (id: string): AppThunk => (dispatch, getState) => {
    let page = getState().packsParameter.page;
    let user_id = getState().packsParameter.user_id;
    const pageCount = getState().packsParameter.pageCount;
    const items = getState().packs.cardPacks.length;
    if (items === 1 && page) {
        page = page - 1;
    }
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    packAPI.deletePack(id).then((res) => {
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        dispatch(initializedPacks({user_id, page, pageCount}));

    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError({parameter: {error}}));
        alert(error);
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

export const updatePack = (id: string, name: string, visibility: boolean, deckCover?: string): AppThunk => (dispatch, getState) => {
    const pageCount = getState().packsParameter.pageCount;
    const user_id = getState().packsParameter.user_id;
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    packAPI.updatePack(id, name, visibility, deckCover).then((res) => {
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        dispatch(initializedPacks({user_id, pageCount}));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError({parameter: {error}}));
        alert(error);
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

// type initialStateType = {
//     cardPacks: Pack[],
//     page: number,
//     pageCount: number,
//     cardPacksTotalCount: number,
//     minCardsCount: number,
//     maxCardsCount: number,
//     token?: string,
//     tokenDeathTime?: number,
//     isLoading?: boolean
// }

export type Pack = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    deckCover: string,
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