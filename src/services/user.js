import { postLogin,post } from '../utils/request';
import { user } from '../utils/api';

export async function login(params) {
    return postLogin(user.login, { data: params });
}

export async function register(params) {
    return postLogin(user.register, { data: params });
}

export async function resetPassword(params) {
    return postLogin(user.resetPassword, { data: params });
}
