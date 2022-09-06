import {authAPI, SignInArgs} from '../../api/userAPI';
import {setError, setInitialized, setPreloaderStatus} from './appReducer';
import {RegistrationData} from '../../components/registration/RegistrationContainer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {parsError} from '../../utils/parsError';

const initialState = {
    isLoggedIn: false,
    isAutoRedirect: false,
    recoveryEmail: '',
    isRegistered: false,
    user: {} as User,
};

export const login = createAsyncThunk('auth/login', async (data: SignInArgs, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        const user = await authAPI.login(data);
        thunkAPI.dispatch(setIsLoggedIn({parameter: {value: true}}));
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        thunkAPI.dispatch(setInitialized({parameter: {isInitialized: true}}));
        return user;

    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

export const logOut = createAsyncThunk('auth/logOut', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        await authAPI.logout();
        thunkAPI.dispatch(setIsLoggedIn({parameter: {value: false}}));
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

export const authorizationUser = createAsyncThunk('auth/authorization', async (arg, thunkAPI) => {
    thunkAPI.dispatch((setPreloaderStatus({parameter: {status: 'loading'}})));
    try {
        const userInfo = await authAPI.getUserInfo();
        thunkAPI.dispatch(setIsLoggedIn({parameter: {value: true}}));
        thunkAPI.dispatch(setInitialized({parameter: {isInitialized: true}}));
        return userInfo.data;
    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    } finally {
        thunkAPI.dispatch((setPreloaderStatus({parameter: {status: 'idle'}})));
        // thunkAPI.dispatch(setInitialized({parameter: {isInitialized: false}}));
    }
});

export const updateUserData = createAsyncThunk('auth/updateUserData', async (data: { name: string, avatar: string }, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        const updateUser = await authAPI.updateUserInformation(data.name, data.avatar);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        return updateUser.data;
    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

export const registration = createAsyncThunk('auth/registration', async (newUser: RegistrationData, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        const user = await authAPI.registerNewUser(newUser);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        alert(' You are autorized');
        return user.data.addedUser;
    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email: string, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    // thunkAPI.dispatch(setRecoveryEmail({parameter: {email: email}}));

    try {
        await authAPI.forgot(email);
        // thunkAPI.dispatch(setRecoveryEmail({parameter: {email: email}}));
        // thunkAPI.dispatch(setIsAutoRedirect({parameter: {isAutoRedirect: true}}));
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        return email;
    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

export const createNewPassword = createAsyncThunk('auth/createNewPassword', async (data: { password: string, resetPasswordToken: string | undefined }, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        await authAPI.setNewPassword(data.password, data.resetPasswordToken);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
    } catch (err) {
        const error = parsError(err as AxiosError);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        thunkAPI.dispatch(setError({parameter: {error: error}}));
        alert(error);
    }
});

const slice = createSlice({
        name: ' auth',
        initialState,
        reducers: {
            setIsLoggedIn(state, action: PayloadAction<{ parameter: { value: boolean } }>) {
                state.isLoggedIn = action.payload.parameter.value;
            },
            // setRecoveryEmail(state, action: PayloadAction<{ parameter: { email: string } }>) {
            //     state.recoveryEmail = action.payload.parameter.email;
            // },
            setIsAutoRedirect(state, action: PayloadAction<{ parameter: { isAutoRedirect: boolean } }>) {
                state.isAutoRedirect = action.payload.parameter.isAutoRedirect;
            },
            // setUserInfo(state, action: PayloadAction<{ parameter: { user: User } }>) {
            //     state.user = action.payload.parameter.user;
            // },
            // setRegisteredUser(state, action: PayloadAction<{ parameter: { isRegistered: boolean } }>) {
            //     state.isRegistered = action.payload.parameter.isRegistered;
            // }
        },
        extraReducers(builder) {
            builder.addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.data;
                }
            });
            builder.addCase(registration.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isRegistered = true;
                }
            });
            builder.addCase(logOut.fulfilled, (state) => {
                state.isRegistered = false;
                state.isLoggedIn = false;
            });
            builder.addCase(authorizationUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                }
            });
            builder.addCase(updateUserData.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.updatedUser;
                }
            });
            builder.addCase(forgotPassword.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isAutoRedirect = true;
                    state.recoveryEmail = action.payload;
                }
            });
        }
    })
;

export const authorizationReducer = slice.reducer;
export const {setIsLoggedIn, setIsAutoRedirect} = slice.actions;

export type ActionTypeFoAuthReducer =
    ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsAutoRedirect>
// | ReturnType<typeof setRecoveryEmail>
// | ReturnType<typeof setRegisteredUser>
// | ReturnType<typeof setUserInfo>

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

// export const authorizationReducer = (state = initialState, action: ActionTypeFoAuthReducer) => {
//     switch (action.type) {
//         case 'auth-setIsLoggedIn': {
//             return {...state, isLoggedIn: action.value};
//         }
//         case 'auth-setRecoveryEmail': {
//             return {...state, recoveryEmail: action.email};
//         }
//         case 'auth-setIsAutoRedirect': {
//             return {...state, isAutoRedirect: action.isAutoRedirect};
//         }
//         case 'set-registrationNewUser': {
//             return {...state, isRegistered: action.isRegistered};
//         }
//         case 'auth-setUserInfo': {
//             return {...state, user: action.user};
//         }
//         default: {
//             return state;
//         }
//     }
// };

// export const setIsLoggedIn = (value: boolean) => ({type: 'auth-setIsLoggedIn', value} as const);
// export const setRecoveryEmail = (email: string) => ({type: 'auth-setRecoveryEmail', email} as const);
// export const setIsAutoRedirect = (isAutoRedirect: boolean) => ({
//     type: 'auth-setIsAutoRedirect',
//     isAutoRedirect,
// } as const);
// export const setUserInfo = (user: User) => ({type: 'auth-setUserInfo', user} as const);

// export const setRegisteredUser = (isRegistered: boolean) => ({type: 'set-registrationNewUser', isRegistered} as const);

// export const registration = (newUser: RegistrationData): AppThunk => (dispatch) => {
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     authAPI.registerNewUser(newUser).then(res => {
//         dispatch(setRegisteredUser({parameter: {isRegistered: true}}));
//         dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//         alert(' You are autorized');
//     }).catch(e => {
//         const error = e.response
//             ? e.response.data.error
//             : (e.message + ', more details in the console');
//         dispatch(setError({parameter: {error}}));
//         alert(error);
//         dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//     });
// };

// export const login = (data: any): AppThunk => (dispatch) => {
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     authAPI.login(data).then(res => {
//         dispatch(setIsLoggedIn({parameter: {value: true}}));
//         dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//         dispatch(setUserInfo({parameter: {user: res.data}}));
//         dispatch(setInitialized({parameter: {isInitialized: true}}));
//
//     }).catch(e => {
//         const error = e.response
//             ? e.response.data.error
//             : (e.message + ', more details in the console');
//         alert(error);
//         dispatch(setError({parameter: {error}}));
//         dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//     });
// };

// export const logOut = (): AppThunk => (dispatch) => {
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     authAPI.logout().then(res => {
//         dispatch(setIsLoggedIn({parameter: {value: false}}));
//         dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//     });
// };

// export const updateUserData = (name: string, avatar: string): AppThunk =>
//     (dispatch) => {
//         dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//         authAPI.updateUserInformation(name, avatar).then((res) => {
//             dispatch(setUserInfo({parameter: {user: res.data.updatedUser}}));
//             dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//         }).finally(() => {
//         });
//     };

// export const forgotPassword = (email: any): AppThunk => (dispatch) => {
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     authAPI.forgot(email).then(res => {
//         dispatch(setError({parameter: {error: null}}));
//         dispatch(setIsAutoRedirect({parameter: {isAutoRedirect: true}}));
//         dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//     }).catch(e => {
//         const error = e.response
//             ? e.response.data.error
//             : (e.message + ', more details in the console');
//         dispatch(setError({parameter: {error}}));
//         alert(error);
//         dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//     });
// };

// export const authorizationUser = (): AppThunk => (dispatch) => {
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     authAPI.getUserInfo().then(res => {
//         dispatch(setUserInfo({parameter: {user: res.data}}));
//         dispatch(setIsLoggedIn({parameter: {value: true}}));
//     }).finally(() => {
//             dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//             dispatch(setInitialized({parameter: {isInitialized: true}}));
//         },
//     );
// };

// export const createNewPassword = (password: string, resetPasswordToken: string | undefined): AppThunk => (dispatch) => {
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     authAPI.setNewPassword(password, resetPasswordToken).then(res => {
//         dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//     })
//         .catch(() => {
//             dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//         });
// };

