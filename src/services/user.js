import { request, post } from '../utils/request';
import { user } from '../utils/api';

export async function login(params) {
    return post(user.login, { data: params });
}

export async function register(params) {
    return post(user.register, { data: params });
}

export async function resetPassword(params) {
    return post(user.resetPassword, { data: params });
}
