import {AppThunk} from '../store';
import {authAPI} from '../../api/cardsApi';
import {setError, setInitialized, setPreloaderStatus} from './app-reducer';

export type User = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
}

const initialState: InitialStateType = {
    isLoggedIn: false,
    isAutoRedirect: false,
    recoveryEmail: '',
    user: {} as User
};

export const authorizationReducer = (state = initialState, action: ActionTypeFoAuthReducer) => {

    console.log('--render auth--');
    switch (action.type) {
        case 'auth-setIsLoggedIn': {
            return {...state, isLoggedIn: action.value};
        }
        case 'auth-setRecoveryEmail': {
            return {...state, recoveryEmail: action.email};
        }
        case 'auth-setIsAutoRedirect': {
            return {...state, isAutoRedirect: action.isAutoRedirect};
        }
        case 'auth-setUser': {
            return {...state, user: action.user};
        }
        default: {
            return state;
        }
    }
};

export const setIsLoggedIn = (value: boolean) => ({type: 'auth-setIsLoggedIn', value} as const);
export const setRecoveryEmail = (email: string) => ({type: 'auth-setRecoveryEmail', email} as const);
export const setIsAutoRedirect = (isAutoRedirect: boolean) => ({
    type: 'auth-setIsAutoRedirect',
    isAutoRedirect,
} as const);
export const setUser = (user: User) => ({
    type: 'auth-setUser',
    user,
} as const);

export const login = (data: any): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus('loading'));
    authAPI.login(data).then(res => {
        dispatch(setIsLoggedIn(true));
        dispatch(setPreloaderStatus('succeeded'));
        dispatch(setUser(res.data))
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        alert(error);
        dispatch(setError(error));
        dispatch(setPreloaderStatus('failed'));
    });
};

export const logoutTC = (): AppThunk => (dispatch) => {
    authAPI.logout().then((res) => {
        dispatch(setIsLoggedIn(false));
    });
};

export const forgotPassword = (email: any): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus('loading'));
    authAPI.forgot(email).then(res => {
        dispatch(setError(null));
        dispatch(setIsAutoRedirect(true));
        dispatch(setPreloaderStatus('succeeded'));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error));
        alert(error);
        dispatch(setPreloaderStatus('failed'));
    });
};

export const createNewPassword = (password: string, resetPasswordToken: string | undefined): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus('loading'));
    authAPI.setNewPassword(password, resetPasswordToken).then(res => {
        dispatch(setPreloaderStatus('succeeded'));
    })
        .catch(() => {
            dispatch(setPreloaderStatus('succeeded'));
        });
};

export type ActionTypeFoAuthReducer =
    ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsAutoRedirect>
    | ReturnType<typeof setRecoveryEmail>
    | ReturnType<typeof setUser>

type InitialStateType = {
    isLoggedIn: boolean,
    isAutoRedirect: boolean,
    recoveryEmail: string
    user: User
}