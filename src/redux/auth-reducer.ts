import react from 'react'
import {AnyAction, Dispatch} from "redux";
import {authAPI, usersAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'

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

export const getAuthUserDataThunkCreator: any = () => (dispatch: Dispatch) => {
    authAPI.getAuthMe().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserDataAC(data.data, true))
        }
    })
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {


    authAPI.login(email, password, rememberMe).then(data => {
        if (data.resultCode === 0) {
            dispatch(getAuthUserDataThunkCreator())
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}))
        }
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserDataAC(initialState, false))
        }
    })
}
