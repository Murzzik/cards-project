import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: [] as Array<string>,
    isInitialized: false,
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setPreloaderStatus(state, action: PayloadAction<{ parameter: { status: RequestStatusType } }>) {
            state.status = action.payload.parameter.status;
        },
        setInitialized(state, action: PayloadAction<{ parameter: { isInitialized: boolean } }>) {
            state.isInitialized = action.payload.parameter.isInitialized;
        },
        setError(state, action: PayloadAction<{ parameter: { error: string } }>) {
            state.error.push(action.payload.parameter.error);
        }
    },
});

export const appReducer = slice.reducer;
export const {setPreloaderStatus, setInitialized, setError} = slice.actions;

export type ActionTypeForAppReducer =
    ReturnType<typeof setPreloaderStatus>
    | ReturnType<typeof setError>
    | ReturnType<typeof setInitialized>
