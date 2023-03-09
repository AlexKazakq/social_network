import {Dispatch} from "redux";
import {ResultCodeForCaptcha, ResultCodesEnum} from "../API/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../API/authAPI";
import {securityAPI} from "../API/securityAPI";
import {BaseThunkType} from "./redux-store";

const SET_USER_DATA = "social-network/auth/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "social-network/auth/GET_CAPTCHA_URL_SUCCESS"

let initialState = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            debugger
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {
        id, email, login, isAuth
    }
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    debugger
    return (
    {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    } as const)
}

export const getAuthUserDataTC = ():ThunkType => async (dispatch: Dispatch) => {
    let data = await authAPI.getAuthMe()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserDataTC())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))

}

export const logoutTC = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        let {id, email, login} = initialState
        dispatch(setAuthUserDataAC(id, email, login, false))
    }
}

type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof getCaptchaUrlSuccess>
type ThunkType = BaseThunkType<ActionType | ReturnType<typeof stopSubmit>>
