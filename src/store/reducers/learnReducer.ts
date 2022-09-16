import {cardsAPI, CardsType, CardToBeGraded} from '../../api/cardsAPI';
import {setPreloaderStatus} from './appReducer';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';

// type StateType = {
//     cards: CardsType[],
//     cardsTotalCount: number,
//     packUserId?: string,
//     packName?: string
// }

export type ActionsLearnType = any

// ReturnType<typeof setPackCards>

const initialState = {
    cards: [] as CardsType[],
    cardsTotalCount: 0,
};

export const getAllCardsFromPackToLearn = createAsyncThunk('learn/getAllCardsFromPackToLearn', async (cardsPack_id: string, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        const allCards = await cardsAPI.getCards({cardsPack_id, pageCount: Infinity});
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        return allCards.data;
    } catch (err) {
        // const error = parsError(err as AxiosError);
        // thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        // thunkAPI.dispatch(setError({parameter: {error: error}}));
        // alert(error);
        errorUtils(err as AxiosError, thunkAPI.dispatch);
    }
});

export const gradeCard = createAsyncThunk('grade/gradeCard', async (card: CardToBeGraded, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
    try {
        await cardsAPI.gradeCard(card);
        thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
        return '';
    } catch (err) {

        // const error = parsError(err as AxiosError);
        // thunkAPI.dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
        // thunkAPI.dispatch(setError({parameter: {error: error}}));
        // alert(error);
        // const dispatch = useAppDispatch();
        // parsError(err as AxiosError, dispatch);

        errorUtils(err as AxiosError, thunkAPI.dispatch);
    }
});

// export const gradeCard_ = (card: CardToBeGraded): AppThunk => (dispatch) => {
//     // dispatch(setPreloaderStatus('loading'));
//     console.log('GRADE THUNK');
//     cardsAPI.gradeCard(card)
//         .then(res => {
//             console.log(res);
//         })
//         .catch(e => {
//             const error = e.response
//                 ? e.response.data.error
//                 : (e.message + ', more details in the console');
//             dispatch(setError({parameter: {error}}));
//             dispatch(setIsLoggedIn({parameter: {value: false}}));
//             if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\\\') {
//                 dispatch(setIsLoggedIn({parameter: {value: false}}));
//             }
//             alert(error);
//             dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//         });
// };

const slice = createSlice({
    name: 'learn',
    initialState,
    reducers: {
        // setPackCards(state, action: PayloadAction<{ parameter: { packs: StateType } }>) {
        //     return state = {...action.payload.parameter.packs};
        // }
    },
    extraReducers(builder) {
        builder.addCase(getAllCardsFromPackToLearn.fulfilled, (state, action) => {
            if (action.payload) {
                return state = {cards: action.payload.cards, cardsTotalCount: action.payload.cardsTotalCount};
            }
        });
    }

});

export const learnReducer = slice.reducer;
// export const {setPackCards} = slice.actions;

// export const getAllCardsFromPackToLearn = (packId: string): AppThunk => (dispatch) => {
//     dispatch(setPreloaderStatus({parameter: {status: 'loading'}}));
//     cardsAPI.getCards({cardsPack_id: packId, pageCount: Infinity})
//         .then(res => {
//             const {cards, cardsTotalCount, packUserId} = res.data;
//             dispatch(setPreloaderStatus({parameter: {status: 'succeeded'}}));
//             dispatch(setPackCards({parameter: {packs: {cards, cardsTotalCount, packUserId}}}));
//         })
//         .catch(e => {
//             const error = e.response
//                 ? e.response.data.error
//                 : (e.message + ', more details in the console');
//             dispatch(setError({parameter: {error}}));
//             dispatch(setIsLoggedIn({parameter: {value: false}}));
//             if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\\\') {
//                 dispatch(setIsLoggedIn({parameter: {value: false}}));
//             }
//             alert(error);
//             dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//         });
// };

// export const gradeCard = (card: CardToBeGraded): AppThunk => (dispatch) => {
//     // dispatch(setPreloaderStatus('loading'));
//     console.log('GRADE THUNK');
//     cardsAPI.gradeCard(card)
//         .then(res => {
//             console.log(res);
//         })
//         .catch(e => {
//             const error = e.response
//                 ? e.response.data.error
//                 : (e.message + ', more details in the console');
//             dispatch(setError({parameter: {error}}));
//             dispatch(setIsLoggedIn({parameter: {value: false}}));
//             if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\\\') {
//                 dispatch(setIsLoggedIn({parameter: {value: false}}));
//             }
//             alert(error);
//             dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
//         });
// };