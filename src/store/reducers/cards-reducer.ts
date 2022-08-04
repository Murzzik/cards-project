import {cardsAPI, CardsType, GetCardType} from '../../api/cardsAPI';
import {AppThunk} from '../store';
import {setError, setPreloaderStatus} from './app-reducer';

const initialState: initialStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
};
export const cardsReducer = (state = initialState, action: ActionTypeForCards): initialStateType => {
    switch (action.type) {
        case 'cards-setCardsData': {
            return action.cardsData;
        }
        default:
            return state;
    }
};

export const setCardsData = (cardsData: initialStateType) => {
    return {type: 'cards-setCardsData', cardsData} as const;
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
type initialStateType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type ActionTypeForCards = ReturnType<typeof setCardsData>