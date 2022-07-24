import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const authAPI = {
    login(data: any) {
        return instance.post<LoginResponse>('auth/login', data);
    }
};

type LoginResponse = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;

    error?: string;

}
