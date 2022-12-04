import react from 'react'
import {Dispatch} from "redux";
import {authAPI, usersAPI} from "../API/api";

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
                isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserDataAC = (data: InitialStateType) => ({
    type: SET_USER_DATA,
    data
})

export const getAuthUserDataThunkCreator = () => (dispatch: Dispatch) => {
    authAPI.getAuthMe().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserDataAC(data.data))
        }
    })
}

