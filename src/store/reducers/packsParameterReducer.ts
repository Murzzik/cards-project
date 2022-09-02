import {GetPackType} from '../../api/packAPI';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: GetPackType = {
    packName: '',
    min: 0,
    max: 110,
    sortPacks: '0updated',
    page: 1,
    pageCount: 4,
    user_id: ''
};

const slice = createSlice({
    name: 'packsParameter',
    initialState: initialState,
    reducers: {
        setPacksParameter(state, action: PayloadAction<{ parameters: GetPackType }>) {
            return action.payload.parameters;
        }
    }
});

export const packsParameterReducer = slice.reducer;
export const setPacksParameter = slice.actions.setPacksParameter;

export type ActionForPacksParameter = ReturnType<typeof setPacksParameter>