import {AppThunk} from '../store';
import {cardsAPI, CardsType, CardToBeGraded} from '../../api/cardsAPI';
import {setError, setPreloaderStatus} from './appReducer';
import {setIsLoggedIn} from './authorizationReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type StateType = {
    cards: CardsType[],
    cardsTotalCount: number,
    packUserId?: string,
    packName?: string
}

export type ActionsLearnType = ReturnType<typeof setPackCards>

const initialState = {
    cards: [] as CardsType[],
    cardsTotalCount: 0,
};

const slice = createSlice({
    name: 'learn',
    initialState,
    reducers: {
        setPackCards(state, action: PayloadAction<{ parameter: { packs: StateType } }>) {
            return state = {...action.payload.parameter.packs};
        }
    }
});

export const learnReducer = slice.reducer;
export const {setPackCards} = slice.actions;

export const getAllCardsFromPackToLearn = (packId: string): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    cardsAPI.getCards({cardsPack_id: packId, pageCount: Infinity})
        .then(res => {
            const {cards, cardsTotalCount, packUserId} = res.data;
            dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
            dispatch(setPackCards({parameter: {packs: {cards, cardsTotalCount, packUserId}}}));
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError({parameter: {error}}));
            dispatch(setIsLoggedIn({parameter: {value: false}}));
            if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\\\') {
                dispatch(setIsLoggedIn({parameter: {value: false}}));
            }
            alert(error);
            dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        });
};

export const gradeCard = (card: CardToBeGraded): AppThunk => (dispatch) => {
    // dispatch(setPreloaderStatus('loading'));
    console.log('GRADE THUNK');
    cardsAPI.gradeCard(card)
        .then(res => {
            console.log(res);
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError({parameter: {error}}));
            dispatch(setIsLoggedIn({parameter: {value: false}}));
            if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\\\') {
                dispatch(setIsLoggedIn({parameter: {value: false}}));
            }
            alert(error);
            dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        });
};