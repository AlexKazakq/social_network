import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../API/api";

type ActionsTypes = ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostActionCreator>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>

export type PostType = {
    id?: number
    message: string
    likesCount: number
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";


let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 10},
        {id: 3, message: "Blabla", likesCount: 10},
        {id: 4, message: "Dada", likesCount: 10},
    ] as PostType[],
    newPostText: "it-kamasutra.com",
    profile: null,
    status: ""
}

export type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            let newPost: PostType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
            };
            return {...state, newPostText: "", posts: [...state.posts, newPost]}

        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            debugger
            return {...state, status: action.status}
    }
    return state
}

export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const updateNewPostActionCreator = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText} as const)
export const setUserProfileAC = (profile: any) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatusAC = (status: string) => ({type: SET_STATUS, status} as const)


export const getUserProfileThunk = (userId: string) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId).then(data => {
        dispatch(setUserProfileAC(data))
    })
}
export const getStatusThunk = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(data => {
            dispatch(setStatusAC(data))
    })
}
export const updateStatusThunk = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(data => {
        if (data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    })
}

export default profileReducer