import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { passwordReducer } from './reducers/password-reducer';
import { profileReducer } from './reducers/profile-reducer';
import { authorizationReducer } from './reducers/authorization-reducer';
import { registrationReducer } from './reducers/registration-reducer';

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