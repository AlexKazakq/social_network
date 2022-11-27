
type ActionsTypes = ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewPostActionCreator> | ReturnType<typeof setUserProfileAC>

export type PostType = {
    id?: number
    message: string
    likesCount: number
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = 'SET_USER_PROFILE';



let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 10},
        {id: 3, message: "Blabla", likesCount: 10},
        {id: 4, message: "Dada", likesCount: 10},
    ] as PostType[],
    newPostText: "it-kamasutra.com",
    profile: null
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
            return {...state, newPostText: '', posts: [...state.posts, newPost]}

        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
    }
    return state
}

export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const updateNewPostActionCreator = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText} as const)
export const setUserProfileAC = (profile: any) => ({type: SET_USER_PROFILE, profile} as const)

export default profileReducer