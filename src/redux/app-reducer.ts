import {getAuthUserDataTC} from "./auth-reducer";
import {BaseThunkType} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

type ActionType = ReturnType<typeof setInitializedSuccessAC>
type ThunkType = BaseThunkType<ActionType>
export type InitialStateType = typeof initialState;

let initialState = {
    initialized: false
};

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
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
} as const)

export const initializeAppTC = (): ThunkType => async (dispatch) => {
    let pr = dispatch(getAuthUserDataTC());
    pr.then(() => {
        dispatch(setInitializedSuccessAC())
    })
}
