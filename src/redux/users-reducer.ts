import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/helpers/object-helpers";
import {UserType} from "../types/types";
import {BaseThunkType} from "./redux-store";
import {usersAPI} from "../API/usersAPI";
import {APIResponseType} from "../API/api";


let initialState = {
    users: [] as UserType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    userId: null,
    followingInProgress: [] as number[],
    filter: {
        term: '',
        friend: null as null | boolean
    }
}


export const usersReducer = (state: UsersInitialStateType = initialState, action: ActionsTypes): UsersInitialStateType => {

    switch (action.type) {
        case "SN/users/FOLLOW":
            return {...state, users: updateObjectInArray(state.users, action.userID, "id", {followed: true})}
        case "SN/users/UNFOLLOW":
            return {...state, users: updateObjectInArray(state.users, action.userID, "id", {followed: false})}
        case "SN/users/SET_USERS":
            return {...state, users: action.users}
        case "SN/users/SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SN/users/SET_FILTER":
            return {...state, filter: action.payload}
        case "SN/users/SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.totalCount}
        case "SN/users/TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "SN/users/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !== action.userId)
            }
    }
    return state
}

export const followAC = (userID: number) => ({type: "SN/users/FOLLOW", userID} as const)
export const unfollowAC = (userID: number) => ({type: "SN/users/UNFOLLOW", userID} as const)
export const setUsersAC = (users: UserType[]) => ({type: "SN/users/SET_USERS", users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: "SN/users/SET_CURRENT_PAGE", currentPage} as const)
export const setFilterAC = (filter: FilterType) => ({type: "SN/users/SET_FILTER", payload: filter} as const)
export const setTotalUsersCountAC = (totalCount: number) => ({
    type: "SN/users/SET_TOTAL_USERS_COUNT",
    totalCount
} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: "SN/users/TOGGLE_IS_FETCHING", isFetching} as const)
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number) => ({
    type: "SN/users/TOGGLE_IS_FOLLOWING_PROGRESS",
    isFetching,
    userId
} as const)

export const requestUsersTC = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(page))
        dispatch(setFilterAC(filter))
        const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))
    }
}

const _followUnfollowFlow =
    async (dispatch: Dispatch<ActionsTypes>,
           userId: number,
           apiMethod: (userId: number) => Promise<APIResponseType>,
           actionCreator: (userId: number) => ReturnType<typeof followAC>
               | ReturnType<typeof unfollowAC>) => {
        dispatch(toggleFollowingProgressAC(true, userId))
        const response = await apiMethod(userId)
        if (response.resultCode === 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(toggleFollowingProgressAC(false, userId))
    }

export const followThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.getFollow.bind(usersAPI), followAC)
    }
}

export const unfollowThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.getUnfollow.bind(usersAPI), unfollowAC)
    }
}

export type UsersInitialStateType = typeof initialState
type ActionsTypes = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleFollowingProgressAC>
    | ReturnType<typeof setFilterAC>

type ThunkType = BaseThunkType<ActionsTypes>
export type FilterType = typeof initialState.filter