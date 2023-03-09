import {BaseThunkType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../API/profileAPI";

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 10},
        {id: 3, message: "Blabla", likesCount: 10},
        {id: 4, message: "Dada", likesCount: 10},
    ] as PostType[],
    profile: null as ProfileType | null,
    status: "",
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ActionsTypes): ProfileInitialStateType => {

    switch (action.type) {
        case 'SN/profile/ADD-POST':
            let newPost: PostType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {...state, posts: [...state.posts, newPost]}
        case "SN/profile/SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "SN/profile/SET_STATUS":
            return {...state, status: action.status}
        case "SN/profile/SET_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        case 'SN/profile/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
    }
    return state
}

export const addPostActionCreator = (newPostText: string) => ({type: "SN/profile/ADD-POST", newPostText} as const)
export const setUserProfileAC = (profile: ProfileType) => ({type: "SN/profile/SET_USER_PROFILE", profile} as const)
export const setStatusAC = (status: string) => ({type: "SN/profile/SET_STATUS", status} as const)
export const savePhotoSuccess = (photos: PhotosType) => ({type: "SN/profile/SET_PHOTO_SUCCESS", photos} as const)
export const deletePost = (postId: number) => ({type: 'SN/profile/DELETE_POST', postId} as const)


export const getUserProfileThunk = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfileAC(data))
}
export const getStatusThunk = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatusAC(data))
}
export const updateStatusThunk = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    } catch(e) {
        //
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfileThunk(userId))
        } else {
            throw new Error("user id can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}


type ActionsTypes = ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof deletePost>
export type ProfileInitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>
