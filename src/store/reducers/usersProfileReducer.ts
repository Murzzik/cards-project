import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../store';
import {profileAPI} from '../../api/profileAPI';
import {RequestStatusType} from './app-reducer';

const initialState = {
    users: [] as UserInfo[],
    isLoading: 'idle' as RequestStatusType,
};

export const userProfileReducer = '';

const slice = createSlice({
    name: 'usersInfo',
    initialState,
    reducers: {
        setNewUser(state, action: PayloadAction<{ user: UserInfo }>) {
            state.users.push(action.payload.user);
        },
        setLoadStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.isLoading = action.payload.status;
        }
    }
});

export const usersProfileReducer = slice.reducer;
export const setNewUser = slice.actions.setNewUser;
export const setLoadStatus = slice.actions.setLoadStatus;
export type ActionForUsersProfileReducer = ReturnType<typeof setNewUser> | ReturnType<typeof setLoadStatus>

export type UserInfo = {
    _id: string;
    email: string;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    avatar: string;
    token: string,
    tokenDeathTime: string,
}

export const getUserProfile = (user_id: string): AppThunk => (dispatch) => {
    dispatch(setLoadStatus({status: 'loading'}));
    profileAPI.getUserProfileInfo(user_id).then(res => {
            dispatch(setNewUser(res.data));
            dispatch(setLoadStatus({status: 'succeeded'}));
        }
    );
};
