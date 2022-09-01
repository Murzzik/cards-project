import {combineReducers} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ActionTypeFoAuthReducer, authorizationReducer} from './reducers/authorization-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ActionTypeForAppReducer, appReducer} from './reducers/appReducer';
import {ActionTypeForPacksReducer, packsReducer} from './reducers/packs-reducer';
import {ActionTypeForCards, cardsReducer} from './reducers/cards-reducer';
import {ActionForPacksParameter, packsParameterReducer} from './reducers/packsParameterReducer';
import {ActionForCardsParameter, cardsParametersReducer} from './reducers/cardsParametersReducer';
import {ActionsLearnType, learnReducer} from './reducers/learnReducer';
import {configureStore} from '@reduxjs/toolkit';
import {ActionForUsersProfileReducer, usersProfileReducer} from './reducers/usersProfileReducer';

const rootReducer = combineReducers({
    auth: authorizationReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
    packsParameter: packsParameterReducer,
    cardsParameter: cardsParametersReducer,
    learn: learnReducer,
    usersInfo: usersProfileReducer

});
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

type AppActionsType = ActionTypeForAppReducer
    | ActionTypeFoAuthReducer
    | ActionTypeForPacksReducer
    | ActionTypeForCards
    | ActionForPacksParameter
    | ActionForCardsParameter
    | ActionsLearnType
    | ActionForUsersProfileReducer

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
