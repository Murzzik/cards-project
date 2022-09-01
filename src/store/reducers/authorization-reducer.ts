import {AppThunk} from '../store';
import {authAPI} from '../../api/userAPI';
import {setError, setInitialized, setPreloaderStatus} from './appReducer';
import {RegistrationData} from '../../components/registration/RegistrationContainer';

const initialState: initialStateType = {
    isLoggedIn: false,
    isAutoRedirect: false,
    recoveryEmail: '',
    isRegistered: false,
    user: {} as User,
};

export const authorizationReducer = (state = initialState, action: ActionTypeFoAuthReducer) => {
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
        case 'set-registrationNewUser': {
            return {...state, isRegistered: action.isRegistered};
        }
        case 'auth-setUserInfo': {
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
export const setUserInfo = (user: User) => ({type: 'auth-setUserInfo', user} as const);

export const setRegisteredUser = (isRegistered: boolean) => ({type: 'set-registrationNewUser', isRegistered} as const);

export const registration = (newUser: RegistrationData): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    authAPI.registerNewUser(newUser).then(res => {
        dispatch(setRegisteredUser(true));
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        alert(' You are autorized');
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError({parameter: {error}}));
        alert(error);
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

export const login = (data: any): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    authAPI.login(data).then(res => {
        dispatch(setIsLoggedIn(true));
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        dispatch(setUserInfo(res.data));
        dispatch(setInitialized({parameter: {isInitialized: true}}));

    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        alert(error);
        dispatch(setError({parameter: {error}}));
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

export const logOut = (): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    authAPI.logout().then(res => {
        dispatch(setIsLoggedIn(false));
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
    });
};

export const updateUserData = (name: string, avatar: string): AppThunk =>
    (dispatch) => {
        dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
        authAPI.updateUserInformation(name, avatar).then((res) => {
            dispatch(setUserInfo(res.data.updatedUser));
            dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        }).finally(() => {
        });
    };

export const forgotPassword = (email: any): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    authAPI.forgot(email).then(res => {
        dispatch(setError({parameter: {error: null}}));
        dispatch(setIsAutoRedirect(true));
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
    }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError({parameter: {error}}));
        alert(error);
        dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    });
};

export const authorizationUser = (): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    authAPI.getUserInfo().then(res => {
        dispatch(setUserInfo(res.data));
        dispatch(setIsLoggedIn(true));
    }).finally(() => {
            dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
            dispatch(setInitialized({parameter: {isInitialized: true}}));
        },
    );
};

export const createNewPassword = (password: string, resetPasswordToken: string | undefined): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    authAPI.setNewPassword(password, resetPasswordToken).then(res => {
        dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
    })
        .catch(() => {
            dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        });
};

export type ActionTypeFoAuthReducer =
    ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsAutoRedirect>
    | ReturnType<typeof setRecoveryEmail>
    | ReturnType<typeof setRegisteredUser>
    | ReturnType<typeof setUserInfo>

type initialStateType = {
    isLoggedIn: boolean,
    isAutoRedirect: boolean,
    recoveryEmail: string,
    isRegistered: boolean,
    user: User
}

export type User = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}