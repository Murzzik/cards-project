import {AppThunk} from "../store";
import {cardsAPI, CardsType, CardToBeGraded} from "../../api/cardsAPI";
import {setError, setPreloaderStatus} from "./app-reducer";
import {setIsLoggedIn} from "./authorization-reducer";

type StateType = {
    cards: CardsType[],
    cardsTotalCount: number,
    packUserId?: string,
    packName?: string
}


export type ActionsLearnType = ReturnType<typeof setPackCards>


const initialState: StateType = {
    cards: [],
    cardsTotalCount: 0,
    // packUserId: null,
    // packName: null
}

export const learnReducer = (state = initialState, action: ActionsLearnType): StateType => {
    switch (action.type) {
        case "SET-PACK-CARDS":
            return {...action.payload}
        default:
            return state
    }
}

export const setPackCards = (packs: StateType) => (
    {type: 'SET-PACK-CARDS', payload: {...packs}} as const
)

export const getAllCardsFromPackToLearn = (packId: string): AppThunk => (dispatch, getState) => {
    dispatch(setPreloaderStatus('loading'));
    cardsAPI.getCards({cardsPack_id: packId, pageCount: Infinity})
        .then(res => {
            const {cards, cardsTotalCount, packUserId} = res.data
            dispatch(setPreloaderStatus('succeeded'));
            dispatch(setPackCards({cards, cardsTotalCount, packUserId}))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error));
            dispatch(setIsLoggedIn(false));
            if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\\\') {
                dispatch(setIsLoggedIn(false));
            }
            alert(error);
            dispatch(setPreloaderStatus('failed'));
        })
}

export const gradeCard = (card: CardToBeGraded): AppThunk => (dispatch) => {
    // dispatch(setPreloaderStatus('loading'));
    console.log('GRADE THUNK')
    cardsAPI.gradeCard(card)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error));
            dispatch(setIsLoggedIn(false));
            if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\\\') {
                dispatch(setIsLoggedIn(false));
            }
            alert(error);
            dispatch(setPreloaderStatus('failed'));
        })
}