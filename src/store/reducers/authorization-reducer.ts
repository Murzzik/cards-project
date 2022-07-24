import {AppThunk} from '../store';
import {authAPI} from '../../api/cardsApi';
import {setError, setPreloaderStatus} from './app-reducer';

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
    dispatch(setPreloaderStatus('loading'));
    authAPI.login(data).then(res => {
        dispatch(setIsLoggedIn(true));
        dispatch(setPreloaderStatus('succeeded'));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');

        dispatch(setError(error));
        dispatch(setPreloaderStatus('failed'));
    });
};

export type ActionTypeFoAuthReducer = ReturnType<typeof setIsLoggedIn>;

type initialStateType = {
    isLoggedIn: boolean
}