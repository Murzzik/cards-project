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
            return {...action.cardsData, triggerAddNewCard: state.triggerAddNewCard, triggerUpdateCard: state.triggerUpdateCard};
        }
        case 'packs-setTriggerForAddNewCard': {
            return {...state, triggerAddNewCard: !state.triggerAddNewCard};
        }
        case 'packs-setTriggerForUpdateCard': {
            return {...state, triggerUpdateCard: !state.triggerUpdateCard};
        }
        default:
            return state;
    }
};

export const setCardsData = (cardsData: GetCardsResponseType) => {
    return {type: 'cards-setCardsData', cardsData} as const;
};

export const setTriggerForAddNewCard = () => {
    return {type: 'packs-setTriggerForAddNewCard'} as const;
};

export const setTriggerForUpdateCard = () => {
    return {type: 'packs-setTriggerForUpdateCard'} as const;
};

export const initializedCards = (args: GetCardType): AppThunk => (dispatch) => {
    cardsAPI.getCards(args).then(res => {
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

export const addNewCard = (packID: string, question: string, answer: string): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus('loading'));
    cardsAPI.addNewCard(packID, question, answer).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        // dispatch(initializedCards({cardsPack_id: packID}));
        dispatch(setTriggerForAddNewCard())
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
    let page = getState().cards.page;
    const pageCount = getState().cards.pageCount;
    const items = getState().cards.cards.length;
    if (items === 1) {
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

export const updateCard = (id: string, question: string, packID: string): AppThunk => (dispatch, getState) => {
    const pageCount = getState().cards.pageCount;
    dispatch(setPreloaderStatus('loading'));
    cardsAPI.updateCard(id, question).then((res) => {
        dispatch(setPreloaderStatus('succeeded'));
        // dispatch(initializedCards({cardsPack_id: packID, pageCount}));
        dispatch(setTriggerForUpdateCard())
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

export type ActionTypeForCards = ReturnType<typeof setCardsData> | ReturnType<typeof setTriggerForUpdateCard> | ReturnType<typeof setTriggerForAddNewCard>