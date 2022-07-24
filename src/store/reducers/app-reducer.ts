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

export type ActionTypeForAppReducer = ReturnType<typeof setPreloaderStatus>

type initialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}