import {GetCardType} from '../../api/cardsAPI';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: GetCardType = {
    cardAnswer: '',
    questionImg: '',
    cardsPack_id: '',
    cardQuestion: '',
    sortCards: '0updated',
    page: 1,
    pageCount: 4
};

const slice = createSlice({
    name: 'cardsParameters',
    initialState: initialState,
    reducers: {
        setCardsParameter(state, action: PayloadAction<{ parameters: GetCardType }>) {
            return action.payload.parameters;
        }
    }
});

export const cardsParametersReducer = slice.reducer;
export const setCardsParameter = slice.actions.setCardsParameter;
// export const cardsParametersReducer = (state = initialState, action: ActionForCardsParameter) => {
//     switch (action.type) {
//         case 'cardsParameter-setCardsParameter': {
//             return action.parameters;
//         }
//         default :
//             return state;
//
//     }
// };
//
// export const setCardsParameter = (args: GetCardType) => {
//     return {type: 'cardsParameter-setCardsParameter', parameters: args} as const;
// };

export type ActionForCardsParameter = ReturnType<typeof setCardsParameter>