import { Dispatch } from 'redux';
import { authAPI } from '../../api/cardsApi';
import { AppThunk } from '../store';

const UPDATE_USER_NAME = 'UPDATE-USER-NAME';
const SET_USER_NAME = 'SET-USER-NAME';

export type ProfileStateType = {
    name: string;
    avatar?: string
}

const initialState: ProfileStateType = {
    name: '',
    avatar: '',
};

export type ProfileActionType = ReturnType<typeof updateUserNameAC>

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionType): ProfileStateType => {
    switch(action.type) {
        case 'UPDATE-USER-NAME':
            return {
                ...state,
                name: action.name,
            };
        default: {
            return state;
        }
    }
};

export const updateUserNameAC = (name: string) =>
    ({type: UPDATE_USER_NAME, name} as const);

export const setUserNameAC = () =>
    ({type: SET_USER_NAME} as const);

export const updateUserNameTC = (name: string): AppThunk =>
    (dispatch: Dispatch<ProfileActionType>) => {
        authAPI.updateUserName(name).then((res) => {
            authAPI.getUserInfo().then((res) => {
                dispatch(updateUserNameAC(res.data.name))
                console.log(res.data.name)
            })
        });
    };