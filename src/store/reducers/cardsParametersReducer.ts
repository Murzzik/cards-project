import {GetCardType} from '../../api/cardsAPI';

const initialState: GetCardType = {
    cardAnswer: "",
    cardQuestion: '',
    cardsPack_id: '',
    sortCards: '0updated',
    page: 1,
    pageCount: 4
};

export const cardsParametersReducer = (state = initialState, action: ActionForCardsParameter) => {
    switch (action.type) {
        case 'cardsParameter-setCardsParameter': {
            return action.parameters;
        }
        default :
            return state;

    }
};

export const setCardsParameter = (args: GetCardType) => {
    return {type: 'cardsParameter-setCardsParameter', parameters: args} as const;
};

export type ActionForCardsParameter = ReturnType<typeof setCardsParameter>