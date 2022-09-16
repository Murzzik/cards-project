import {setError, setPreloaderStatus} from '../store/reducers/appReducer';
import {AxiosError} from 'axios';
import {ThunkDispatch} from 'redux-thunk';

export const errorUtils = (e: AxiosError, dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(setPreloaderStatus({parameter: {status: 'failed'}}));
    const error = e.response?.data ? (e.response?.data as ({ error: string })).error : e.message + ', more details in the console';
    dispatch(setError({parameter: {error: error}}));
    // setTimeout(()=>{
    //     dispatch(setError({parameter: {error: null}}));
    // }, 100)
};