import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../API/api";

type ActionsTypes = ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>

export type PostType = {
    id?: number
    message: string
    likesCount: number
}

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";


let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 10},
        {id: 3, message: "Blabla", likesCount: 10},
        {id: 4, message: "Dada", likesCount: 10},
    ] as PostType[],
    profile: null,
    status: ""
}

export type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            let newPost: PostType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {...state, posts: [...state.posts, newPost]}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
    }
    return state
}

export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const setUserProfileAC = (profile: any) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatusAC = (status: string) => ({type: SET_STATUS, status} as const)


export const getUserProfileThunk = (userId: string) => async (dispatch: Dispatch) => {
    let data = await usersAPI.getProfile(userId)
    dispatch(setUserProfileAC(data))

}
export const getStatusThunk = (userId: string) => async (dispatch: Dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatusAC(data))
}
export const updateStatusThunk = (status: string) => async (dispatch: Dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}

export default profileReducer