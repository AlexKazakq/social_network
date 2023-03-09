import {instance, APIResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

export const authAPI = {
    getAuthMe() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum & ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }
}

export type MeResponseDataType = {
        id: number
        email: string
        login: string
}
export type LoginResponseDataType = {
        userId: string
}
