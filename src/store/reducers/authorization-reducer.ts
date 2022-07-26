import { AnyAction, Dispatch } from 'redux';
import { AppThunk } from '../store';
import { cardsAPI } from '../../api/cards-api';
import { updateUserNameAC } from './profile-reducer';

const USER_AUTHORIZATION = 'USER-AUTHORIZATION';

export type AuthorizationStateType = {
    email: string;
    password: string;
    rememberMe: boolean;
}

const initialState: AuthorizationStateType = {
    email: 'mcalexstar@gmail.com',
    password: '1596Element',
    rememberMe: true
}

export type AuthorizationActionType = ReturnType<typeof userAuthAC>

export const authorizationReducer = (state: AuthorizationStateType = initialState, action: AuthorizationActionType): AuthorizationStateType => {
    switch(action.type) {
        case 'USER-AUTHORIZATION':
            return {
                ...state,
                email: action.email,
                password: action.password,
                rememberMe: action.rememberMe
            }
        default: {
            return state;
        }
    }
};

export const userAuthAC = (email: string, password: string, rememberMe: boolean) =>
    ({type: USER_AUTHORIZATION, email, password, rememberMe} as const);

export const userLoginTC = (email: string, password: string, rememberMe: boolean): AppThunk =>
    (dispatch: Dispatch<AuthorizationActionType>) => {
        cardsAPI.userAuthorization(email, password, rememberMe).then((res) => {
            dispatch(userAuthAC(email, password, rememberMe))
        })
    }