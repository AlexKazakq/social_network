import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '48a4d549-4d56-4920-8006-26084b5d494f'
    }
});

export enum ResultCodesEnum {
    Success,
    Error,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    resultCode: RC,
    messages: Array<string>
}