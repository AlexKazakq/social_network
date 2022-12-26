import react from 'react'
import {Dispatch} from "redux";
import {getAuthUserDataTC} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

type ActionType = ReturnType<typeof setInitializedSuccessAC>

export type InitialStateType = typeof initialState;

let initialState = {
    initialized: false
};

export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:

            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const setInitializedSuccessAC = () => ({
    type: INITIALIZED_SUCCESS,
})

export const initializeAppTC: any = () => (dispatch: Dispatch) => {
    let pr = dispatch(getAuthUserDataTC());
    pr.then(() => {
        dispatch(setInitializedSuccessAC())
    })
}
