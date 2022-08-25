import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    users: [] as UserInfo[]
};

export const userProfileReducer = '';

const slice = createSlice({
    name: 'usersInfo',
    initialState,
    reducers: {
        setNewUser(state, action: PayloadAction<{ user: UserInfo }>) {
            state.users.push(action.payload.user);
        }
    }
});

export const usersProfileReducer = slice.reducer;
export const setNewUser = slice.actions.setNewUser;
export type ActionForUsersProfileReducer = ReturnType<typeof setNewUser>

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

