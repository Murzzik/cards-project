import {AxiosError} from 'axios';

export const parsError = (e: AxiosError): string => {
    console.log(e);
    const error = e.response?.data ? (e.response?.data as ({ error: string })).error : e.message + 'bla';
    return error;
};