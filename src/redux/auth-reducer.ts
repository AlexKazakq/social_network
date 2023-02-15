import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "social-network/auth/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "social-network/auth/GET_CAPTCHA_URL_SUCCESS"

type ActionType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof getCaptchaUrlSuccess>

type InitialStateType = {
    id: string | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
};

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

export const authReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
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

export const setAuthUserDataAC = (data: InitialStateType, isAuth: boolean) => ({
    type: SET_USER_DATA,
    data,
    isAuth
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    debugger
    return (
    {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    } as const)
}

export const getAuthUserDataTC: any = () => async (dispatch: Dispatch) => {
    let data = await authAPI.getAuthMe()
    if (data.resultCode === 0) {
        dispatch(setAuthUserDataAC(data.data, true))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: Dispatch) => {


    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        if (data.resultCode === 10) {
            // @ts-ignore
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
    debugger
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))

}

export const logoutTC = () => async (dispatch: Dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserDataAC(initialState, false))
    }
}
