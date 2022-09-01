import {cardsAPI, CardsType, GetCardsResponseType, GetCardType} from '../../api/cardsAPI';
import {AppThunk} from '../store';
import {setError, setPreloaderStatus} from './appReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCardsData(state, action: PayloadAction<{ parameters: { cardsData: GetCardsResponseType } }>) {
            state = action.payload.parameters.cardsData;
        }
    }
});

export const cardsReducer = slice.reducer;
export const {setCardsData} = slice.actions;
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

export const initializedCards = (args: GetCardType): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    cardsAPI.getCards(args).then(res => {
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        dispatch(setCardsData({parameters: {cardsData: res.data}}));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError({parameter: {error}}));
        alert(error);
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

export const addNewCard = (packID: string, question: string, answer: string, questionImg?: string): AppThunk => (dispatch, getState) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    const pageCount = getState().cardsParameter.pageCount;
    cardsAPI.addNewCard(packID, question, answer, questionImg).then((res) => {
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        dispatch(initializedCards({cardsPack_id: packID, pageCount}));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError({parameter: {error}}));
        alert(error);
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

export const deleteCard = (id: string, packID: string): AppThunk => (dispatch, getState) => {
    let page = getState().cardsParameter.page;
    const pageCount = getState().cardsParameter.pageCount;
    const items = getState().cards.cards.length;
    if (items === 1 && page) {
        page = page - 1;
    }
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    cardsAPI.deleteCard(id).then((res) => {
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        dispatch(initializedCards({cardsPack_id: packID, page, pageCount}));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError({parameter: {error}}));
        alert(error);
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

export const updateCard = (id: string, question: string, answer: string, packID: string, questionImg?: string): AppThunk => (dispatch, getState) => {
    const pageCount = getState().cardsParameter.pageCount;
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    cardsAPI.updateCard(id, question, answer, questionImg).then((res) => {
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        dispatch(initializedCards({cardsPack_id: packID, pageCount}));
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

export type ActionTypeForCards = ReturnType<typeof setCardsData>