import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {profileAPI} from '../../api/profileAPI';
import {RequestStatusType} from './appReducer';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';

const initialState = {
    users: [] as UserInfo[],
    isLoading: 'idle' as RequestStatusType,
};

export const getUserProfile = createAsyncThunk('user/info', async (user_id: string, thunkAPI) => {
    thunkAPI.dispatch(setLoadStatus({status: 'loading'}));
    // return profileAPI.getUserProfileInfo(user_id).then(res => {
    //     thunkAPI.dispatch(setLoadStatus({status: 'succeeded'}));
    //     return res.data;
    // });
    try {
        const user = await profileAPI.getUserProfileInfo(user_id);
        thunkAPI.dispatch(setLoadStatus({status: 'succeeded'}));
        return user.data;
    } catch (err) {
        // const error = err as AxiosError<{ error: string }>;
        // thunkAPI.dispatch(setLoadStatus({status: 'failed'}));
        // thunkAPI.dispatch(setError({parameter: {error: error?.response?.data?.error as string}}));
        errorUtils(err as AxiosError, thunkAPI.dispatch);
    }

});

const slice = createSlice({
    name: 'usersInfo',
    initialState,
    reducers: {
        // setNewUser(state, action: PayloadAction<{ user: UserInfo }>) {
        //     state.users.push(action.payload.user);
        // },
        setLoadStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.isLoading = action.payload.status;
        }
    },
    extraReducers(builder) {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            action.payload && state.users.push(action.payload.user);
        });
    }
});

export const usersProfileReducer = slice.reducer;
// export const setNewUser = slice.actions.setNewUser;
export const setLoadStatus = slice.actions.setLoadStatus;
// export type ActionForUsersProfileReducer = ReturnType<typeof setNewUser> | ReturnType<typeof setLoadStatus>
export type ActionForUsersProfileReducer = ReturnType<typeof setLoadStatus>

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

// export const getUserProfile = (user_id: string): AppThunk => (dispatch) => {
//     dispatch(setLoadStatus({status: 'loading'}));
//     profileAPI.getUserProfileInfo(user_id).then(res => {
//             dispatch(setNewUser(res.data));
//             dispatch(setLoadStatus({status: 'succeeded'}));
//         }
//     );
// };
