export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: initialStateType = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
};

export const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        default : {
            return state;
        }
    }
};

type initialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}