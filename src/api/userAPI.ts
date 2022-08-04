import axios from 'axios';
import {instance} from './instance';
import Package from './../../package.json'

const gitUrl = Package.homepage

export const authAPI = {
    login(data: SignInArgs) {
        return instance.post<MeRes>('auth/login', data);
    },
    forgot(email: string) {
        const data = {
            email,
            message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='${gitUrl+'/#'}set-new-password/$token$'>link</a></div>`,
        };
        return axios.post<ForgotRes>('https://neko-back.herokuapp.com/2.0/auth/forgot', data);
    },
    setNewPassword(password: string, resetPasswordToken: string | undefined) {
        return instance.post<SetNewPasswordRes>('auth/set-new-password', {password, resetPasswordToken});
    },
    updateUserName(name: string) {
        return instance.put<UpdateMeRes>('/auth/me', {name});
    },
    getUserInfo() {
        return instance.post<MeRes>('/auth/me');
    },
    logout() {
        return instance.delete<SignOutRes>('/auth/me');
    },
    registerNewUser(newUser: SignUpArgs) {
        return instance.post<SignUpRes>('/auth/register', newUser);
    },

};
export type SignInArgs = {
    email: string
    password: string
    rememberMe: boolean
}
type ForgotRes = {
    info: string
    error?: string
}
type SignOutRes = {
    info: string
    error?: string
}
type SetNewPasswordRes = {
    info: string
    error?: string
}
export type SignUpRes = {
    addedUser: MeRes
    error?: string
}
export type SignUpArgs = {
    email: string
    password: string
}
export type UpdateMeRes = {
    updatedUser: MeRes
    error?: string
}
type MeRes = {
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
