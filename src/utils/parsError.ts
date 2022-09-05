import {AxiosError} from 'axios';

export const parsError = (e: AxiosError): string => {
    console.log(e);
    // @ts-ignore
    return e.response?.data ? e.response.data.error : (e.message + ', more details in the console');
};