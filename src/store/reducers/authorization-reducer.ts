import { AnyAction } from 'redux';

const initialState: any = {};

export const authorizationReducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {

        default: {
            return state;
        }
    }
};