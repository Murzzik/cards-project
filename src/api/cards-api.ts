import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0',
    withCredentials: true,
});

export const cardsAPI = {
    updateUserName(name: string) {
        return instance.put<{name: string}, AxiosResponse<ResponseType>>('/auth/me', {name});
    },
    getUserInfo() {
        return instance.post('/auth/me', {});
    },
    userAuthorization(email: string, password: string, rememberMe: boolean) {
        return instance.post<{email: string, password: string, rememberMe: boolean},
            AxiosResponse<ResponseType>>('/auth/login', {email, password, rememberMe});
    },

};