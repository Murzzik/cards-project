import {AppThunk} from '../store';
import {authAPI} from '../../api/cardsApi';

const initialState: initialStateType = {
    isLoggedIn: false
};

export const authorizationReducer = (state = initialState, action: ActionTypeFoAuthReducer) => {
    switch (action.type) {
        case 'auth-setIsLoggedIn': {
            return {...state, isLoggedIn: action.value};
        }
        default: {
            return state;
        }
    }
};

export const setIsLoggedIn = (value: boolean) => ({type: 'auth-setIsLoggedIn', value} as const);

export const login = (data: any): AppThunk => (dispatch) => {
    authAPI.login(data).then(res => {
        dispatch(setIsLoggedIn(true));
    });
};

export type ActionTypeFoAuthReducer = ReturnType<typeof setIsLoggedIn>;

type initialStateType = {
    isLoggedIn: boolean
}