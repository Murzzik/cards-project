import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {passwordReducer} from './reducers/password-reducer';
import {profileReducer} from './reducers/profile-reducer';
import {ActionTypeFoAuthReducer, authorizationReducer} from './reducers/authorization-reducer';
import {registrationReducer} from './reducers/registration-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './reducers/app-reducer';

const reducers = {
    authorizationReducer,
    registrationReducer,
    profileReducer,
    passwordReducer,
};

export const configureStore = () => {
    const composeEnhancers =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
            })
            : compose;

    const enhancer = composeEnhancers(applyMiddleware(thunk));

    // Stub

    return createStore(combineReducers(reducers), enhancer);
};

const rootReducer = combineReducers({
    auth: authorizationReducer,
    password: passwordReducer,
    profile: profileReducer,
    registration: registrationReducer,
    app: appReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type AppActionsType = ActionTypeFoAuthReducer

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;



