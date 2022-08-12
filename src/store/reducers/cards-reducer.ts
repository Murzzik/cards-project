import {cardsAPI, CardsType, GetCardsResponseType, GetCardType} from '../../api/cardsAPI';
import {AppThunk} from '../store';
import {setError, setPreloaderStatus} from './app-reducer';

const initialState: initialStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',
    triggerAddNewCard: false,
    triggerUpdateCard: false
};
export const cardsReducer = (state = initialState, action: ActionTypeForCards): initialStateType => {
    switch (action.type) {
        case 'cards-setCardsData': {
            return {...action.cardsData};
        }
        default:
            return state;
    }
};

export const setCardsData = (cardsData: GetCardsResponseType) => {
    return {type: 'cards-setCardsData', cardsData} as const;
};

export const initializedCards = (args: GetCardType): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus('loading'));
    cardsAPI.getCards(args).then(res => {
        dispatch(setPreloaderStatus('succeeded'));
        dispatch(setCardsData(res.data));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
};

export const addNewCard = (packID: string, question: string, answer: string): AppThunk => (dispatch, getState) => {
    dispatch(setPreloaderStatus('loading'));
    const pageCount = getState().cardsParameter.pageCount;
    cardsAPI.addNewCard(packID, question, answer).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        dispatch(initializedCards({cardsPack_id: packID, pageCount}));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
};

export const deleteCard = (id: string, packID: string): AppThunk => (dispatch, getState) => {
    let page = getState().cardsParameter.page;
    const pageCount = getState().cardsParameter.pageCount;
    const items = getState().cards.cards.length;
    if (items === 1 && page) {
        page = page - 1;
    }
    dispatch(setPreloaderStatus('loading'));
    cardsAPI.deleteCard(id).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        dispatch(initializedCards({cardsPack_id: packID, page, pageCount}));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
};

export const updateCard = (id: string, question: string, answer: string, packID: string): AppThunk => (dispatch, getState) => {
    const pageCount = getState().cardsParameter.pageCount;
    dispatch(setPreloaderStatus('loading'));
    cardsAPI.updateCard(id, question, answer).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        dispatch(initializedCards({cardsPack_id: packID, pageCount}));
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
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    triggerAddNewCard?: boolean,
    triggerUpdateCard?: boolean
}

export type ActionTypeForCards = ReturnType<typeof setCardsData>