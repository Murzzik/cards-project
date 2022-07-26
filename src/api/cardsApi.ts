import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const authAPI = {
    login(data: any) {
        return instance.post<LoginResponse>('auth/login', data);
    },
    forgot(email: string) {
        const data = {
            email,
            message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`,
        };
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', data);
    },
    setNewPassword(password: string, resetPasswordToken: string | undefined) {
        return instance.post('auth/set-new-password', {password, resetPasswordToken});
    },
    updateUserName(name: string) {
        return instance.put<{name: string}>('/auth/me', {name});
    },
    getUserInfo() {
        return instance.post('/auth/me', {});
    },

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
