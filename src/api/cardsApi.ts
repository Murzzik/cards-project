import axios from 'axios';
import {RegistrationData} from '../components/registration/RegistrationContainer';

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0' || 'http://localhost:7542/2.0/',
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
        return instance.post('auth/set-new-password', { password, resetPasswordToken });
    },
    updateUserName(name: string) {
        return instance.put('/auth/me', { name });
    },
    getUserInfo() {
        return instance.post('/auth/me', {});
    },
    logout() {
        return instance.delete('/auth/me', {});
    },
    registerNewUser(newUser: RegistrationData) {
        return instance.post('/auth/register', newUser)
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
