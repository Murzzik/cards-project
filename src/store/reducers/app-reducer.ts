export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: initialStateType = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
};

export const appReducer = (state = initialState, action: ActionTypeForAppReducer) => {
    switch (action.type) {
        case 'app-setPreloaderStatus': {
            return {...state, status: action.status};
        }
        case 'app-setError': {
            return {...state, error: action.error};
        }
        default : {
            return state;
        }
    }
};

export const setPreloaderStatus = (status: RequestStatusType) => {
    return {
        type: 'app-setPreloaderStatus',
        status
    } as const;
};



export const setError = (error: null | string) => {
    return {
        type: 'app-setError',
        error
    } as const;
};

export type ActionTypeForAppReducer = ReturnType<typeof setPreloaderStatus> | ReturnType<typeof setError>

type initialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}