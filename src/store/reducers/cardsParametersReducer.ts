import {GetCardType} from '../../api/cardsAPI';

const initialState: GetCardType = {
    cardAnswer: '',
    cardQuestion: '',
    questionImg: '',
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
        case 'SET-QUESTION-IMAGE': {
            return {...state, questionImg: action.questionImage}
        }
        default :
            return state;

    }
};

export const setCardsParameter = (args: GetCardType) => {
    return {type: 'cardsParameter-setCardsParameter', parameters: args} as const;
};

export const setQuestionImg = (questionImage: string) => {
    return {type: 'SET-QUESTION-IMAGE', questionImage} as const;
}

export type ActionForCardsParameter = ReturnType<typeof setCardsParameter> | ReturnType<typeof setQuestionImg>