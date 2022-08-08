import {GetCardsType} from '../../api/packAPI';

const initialState: GetCardsType = {
    packName: '',
    min: 0,
    max: 110,
    sortPacks: '0updated',
    page: 1,
    pageCount: 4,
    user_id: ''
};

export const packsParameterReducer = (state = initialState, action: ActionForPacksParameter) => {
    switch (action.type) {
        case 'packsParameter-setPacksParameter': {
            return action.parameters;
        }
        default :
            return state;

    }
};

export const setPacksParameter = (args: GetCardsType) => {
    return {type: 'packsParameter-setPacksParameter', parameters: args} as const;
};

export type ActionForPacksParameter = ReturnType<typeof setPacksParameter>