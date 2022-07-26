import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { passwordReducer } from './reducers/password-reducer';
import { ProfileActionType, profileReducer } from './reducers/profile-reducer';
import { authorizationReducer } from './reducers/authorization-reducer';
import { registrationReducer } from './reducers/registration-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ActionTypeForAppReducer, appReducer } from './reducers/app-reducer';

const rootReducer = combineReducers({
    auth: authorizationReducer,
    password: passwordReducer,
    profile: profileReducer,
    registration: registrationReducer,
    app: appReducer

});
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type AppActionsType = ProfileActionType | ActionTypeForAppReducer

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
