import {cardsAPI, CardsType, GetCardType} from '../../api/cardsAPI';
import {AppRootStateType} from '../store';
import {setError, setPreloaderStatus} from './appReducer';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {parsError} from '../../utils/parsError';
import {AxiosError} from 'axios';

const initialState = {
    cards: [] as CardsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    packName: '',
    packDeckCover: '',
    pageCount: 4,
    packUserId: '',
};

export const initializedCards = createAsyncThunk('cards/initializedCards', async (args: GetCardType, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        const cards = await cardsAPI.getCards(args);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        return cards;
    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

export const addNewCard = createAsyncThunk('cards/addNewCard', async (data: { packID: string, question: string, answer: string, questionImg?: string }, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        await cardsAPI.addNewCard(data.packID, data.question, data.answer, data.questionImg);
        // await thunkAPI.dispatch(initializedCards({cardsPack_id: data.packID, pageCount, page: 1}));
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

export const deleteCard = createAsyncThunk('cards/deleteCard', async (data: { cardId: string, packID: string }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType;
    let page = state.cardsParameter.page;
    const pageCount = state.cardsParameter.pageCount;
    const items = state.cards.cards.length;
    if (items === 1 && page) {
        page = page - 1;
    }
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        await cardsAPI.deleteCard(data.cardId);
        await thunkAPI.dispatch(initializedCards({cardsPack_id: data.packID, page, pageCount}));
         thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

export const updateCard = createAsyncThunk('cards/updateCard', async (data: { id: string, question: string, answer: string, packID: string, questionImg?: string }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType;
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        await cardsAPI.updateCard(data.id, data.question, data.answer, data.questionImg);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));

    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        // setCardsData(state, action: PayloadAction<{ parameters: { cardsData: GetCardsResponseType } }>) {
        //     return action.payload.parameters.cardsData;
        // }
    },
    extraReducers(builder) {
        builder.addCase(initializedCards.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload.data;
            }
        });
    }
});

export const cardsReducer = slice.reducer;
// export const {setCardsData} = slice.actions;
// export const cardsReducer = (state = initialState, action: ActionTypeForCards): initialStateType => {
//     switch (action.type) {
//         case 'cards-setCardsData': {
//             return {...action.cardsData};
//         }
//         default:
//             return state;
//     }
// };

// export const setCardsData = (cardsData: GetCardsResponseType) => {
//     return {type: 'cards-setCardsData', cardsData} as const;
// };

// export const initializedCards = (args: GetCardType): AppThunk => (dispatch) => {
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     cardsAPI.getCards(args).then(res => {
//         dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//         dispatch(setCardsData({parameters: {cardsData: res.data}}));
//     }).catch(e => {
//         const error = e.response
//             ? e.response.data.error
//             : (e.message + ', more details in the console');
//         dispatch(setError({parameter: {error}}));
//         alert(error);
//         dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//     });
// };

// export const addNewCard = (packID: string, question: string, answer: string, questionImg?: string): AppThunk => (dispatch, getState) => {
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     const pageCount = getState().cardsParameter.pageCount;
//     cardsAPI.addNewCard(packID, question, answer, questionImg).then((res) => {
//         dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//         dispatch(initializedCards({cardsPack_id: packID, pageCount}));
//     }).catch(e => {
//         const error = e.response
//             ? e.response.data.error
//             : (e.message + ', more details in the console');
//         dispatch(setError({parameter: {error}}));
//         alert(error);
//         dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//     });
// };

// export const deleteCard = (id: string, packID: string): AppThunk => (dispatch, getState) => {
//     let page = getState().cardsParameter.page;
//     const pageCount = getState().cardsParameter.pageCount;
//     const items = getState().cards.cards.length;
//     if (items === 1 && page) {
//         page = page - 1;
//     }
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     cardsAPI.deleteCard(id).then((res) => {
//         dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//         dispatch(initializedCards({cardsPack_id: packID, page, pageCount}));
//     }).catch(e => {
//         const error = e.response
//             ? e.response.data.error
//             : (e.message + ', more details in the console');
//         dispatch(setError({parameter: {error}}));
//         alert(error);
//         dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//     });
// };

// export const updateCard = (id: string, question: string, answer: string, packID: string, questionImg?: string): AppThunk => (dispatch, getState) => {
//     const pageCount = getState().cardsParameter.pageCount;
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     cardsAPI.updateCard(id, question, answer, questionImg).then((res) => {
//         dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//         dispatch(initializedCards({cardsPack_id: packID, pageCount}));
//     }).catch(e => {
//         const error = e.response
//             ? e.response.data.error
//             : (e.message + ', more details in the console');
//         dispatch(setError({parameter: {error}}));
//         alert(error);
//         dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//     });
// };

// type initialStateType = {
//     cards: CardsType[]
//     cardsTotalCount: number
//     maxGrade: number
//     minGrade: number
//     page: number
//     packName: string
//     packDeckCover: string
//     pageCount: number
//     packUserId: string
//     triggerAddNewCard?: boolean,
//     triggerUpdateCard?: boolean
// }

export type ActionTypeForCards =
    any
// |ReturnType<typeof setCardsData>