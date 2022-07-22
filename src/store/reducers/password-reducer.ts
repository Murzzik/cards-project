import { AnyAction } from 'redux';

const initialState: any = {};

export const passwordReducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {

        default: {
            return state;
        }
    }
};