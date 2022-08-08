import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionTypeFoAuthReducer, authorizationReducer } from './reducers/authorization-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ActionTypeForAppReducer, appReducer } from './reducers/app-reducer';
import { ActionTypeForPacksReducer, packsReducer } from './reducers/packs-reducer';
import { ActionTypeForCards, cardsReducer } from './reducers/cards-reducer';
import {ActionForPacksParameter, packsParameterReducer} from './reducers/packsParameterReducer';
import {ActionForCardsParameter, cardsParametersReducer} from './reducers/cardsParametersReducer';

const rootReducer = combineReducers({
    auth: authorizationReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
    packsParameter: packsParameterReducer,
    cardsParameter: cardsParametersReducer

});
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type AppActionsType = ActionTypeForAppReducer | ActionTypeFoAuthReducer | ActionTypeForPacksReducer | ActionTypeForCards | ActionForPacksParameter | ActionForCardsParameter

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
