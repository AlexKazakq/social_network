import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'e328080c-7f51-40b5-8feb-88ff404ec80b'
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