import {Dispatch} from "redux";
import {authAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "social-network/auth/SET_USER_DATA"

type ActionType = ReturnType<typeof setAuthUserDataAC>

type InitialStateType = {
    id: string | null
    email: string | null
    login: string | null
    isAuth: boolean
};

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

export const authReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        default:
            return state
    }
}

export const setAuthUserDataAC = (data: InitialStateType, isAuth: boolean) => ({
    type: SET_USER_DATA,
    data,
    isAuth
})

export const getAuthUserDataTC: any = () => async (dispatch: Dispatch) => {
    let data = await authAPI.getAuthMe()
    if (data.resultCode === 0) {
        dispatch(setAuthUserDataAC(data.data, true))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {


    let data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserDataAC(initialState, false))
    }
}
