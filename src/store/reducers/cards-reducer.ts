import {cardsAPI, CardsType, GetCardType} from '../../api/cardsAPI';
import {AppThunk} from '../store';

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