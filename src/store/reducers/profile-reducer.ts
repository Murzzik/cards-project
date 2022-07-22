import { AnyAction } from 'redux';

const initialState: any = {};

export const profileReducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {

        default: {
            return state;
        }
    }
};