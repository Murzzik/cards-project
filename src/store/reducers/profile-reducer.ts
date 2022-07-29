import { Dispatch } from 'redux';
import { authAPI } from '../../api/cardsApi';
import { AppThunk } from '../store';
import {setIsLoggedIn, setUser} from './authorization-reducer';
import {setInitialized} from './app-reducer';

const UPDATE_USER_NAME = 'UPDATE-USER-NAME';
const SET_USER_NAME = 'SET-USER-NAME';

export type ProfileStateType = {
    name: string;
    email: string
    avatar?: string
}

const initialState: ProfileStateType = {
    name: '',
    email: '',
    avatar: '',
};

export type ProfileActionType =
    ReturnType<typeof updateUserNameAC>
    | ReturnType<typeof setUserInfoAC>

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionType): ProfileStateType => {
    switch(action.type) {
        case 'UPDATE-USER-NAME':
            return {
                ...state,
                name: action.name,
            };
        case 'SET-USER-NAME':
            return {
                ...state,
                name: action.name,
                email: action.email,
                avatar: action.avatar,
            };
        default: {
            return state;
        }
    }
};

export const updateUserNameAC = (name: string) =>
    ({ type: UPDATE_USER_NAME, name } as const);

export const setUserInfoAC = (name: string, email: string, avatar: string) =>
    ({ type: SET_USER_NAME, name, email, avatar } as const);

export const updateUserNameTC = (name: string): AppThunk =>
    (dispatch: Dispatch<ProfileActionType>) => {
        authAPI.updateUserName(name).then((res) => {
            dispatch(updateUserNameAC(res.data.updatedUser.name));
        });
    };
export const getUserInformationTC = (): AppThunk =>
    (dispatch) => {

        authAPI.getUserInfo().then((res) => {
            dispatch(setIsLoggedIn(true));
            dispatch(setUser(res.data));
            // dispatch(setUserInfoAC(res.data.name, res.data.email, res.data.avatar));
        }).catch(res=>{

        }).finally( ()=>{
            dispatch(setInitialized(true))
        });
    };

