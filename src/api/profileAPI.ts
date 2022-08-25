import {instance} from './instance';
import {UserInfo} from '../store/reducers/usersProfileReducer';

export const profileAPI = {
    getUserProfileInfo(user_id: string) {
        // @ts-ignore
        return instance.get<UserInfo>(`social/user`, {id: user_id});
    },
};