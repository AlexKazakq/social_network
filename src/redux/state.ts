export type AppPropsType = {
    profilePage : ProfilePageType
   messagesPage: DialogPageType
}
export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
}
export type DialogPageType = {
    messages: MessagesType[]
    dialogs: DialogsType[]
}

export type PostsType = {
    id?: number
    message: string
    likesCount: number
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id?: number
    message: string
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";


export type StorePropsType = {
    _state:AppPropsType,
    _callSubscriber: () => void,
    subscribe:(observe:() => void) => void
    getState: () => AppPropsType
    dispatch: (action:  ReturnType<typeof addPostActionCreator > | ReturnType<typeof updateNewPostActionCreator>) => void
}

// export type AddPostActionType = {
//     type: "ADD-POST",
// }
// export type AddPostActionType = ReturnType<typeof addPostActionCreator >
    
// export type updateNewPostTextActionType = {
//     type: "UPDATE-NEW-POST-TEXT",
//     newText: string
// }
// export type updateNewPostTextActionType = ReturnType<typeof updateNewPostActionCreator >

export type ActionsTypes = ReturnType<typeof addPostActionCreator > | ReturnType<typeof updateNewPostActionCreator>

export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const updateNewPostActionCreator = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText} as const)

export let store: StorePropsType = {
    _state: {
        profilePage:  {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 12},
                {id: 2, message: "It's my first post", likesCount: 10},
                {id: 3, message: "Blabla", likesCount: 10},
                {id: 4, message: "Dada", likesCount: 10},
            ],
            newPostText: 'it-kamasutra.com'
        },
        messagesPage: {
            dialogs: [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Alex"},
                {id: 3, name: "Andrey"},
                {id: 4, name: "Sveta"},
                {id: 5, name: "Viktor"},
                {id: 6, name: "Valera"},
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How is your IT-KAMASUTRA"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"},
            ]
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state
    },
    subscribe(observer)  {
        this._callSubscriber = observer
    },


    dispatch(action) { // {    type : "ADD-POST"}
        if (action.type === "ADD-POST") {
            const newPost: PostsType = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0,
            };
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = '';
            this._callSubscriber()
        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber()
        }
    }
}

// let rerenderEntireTree = () => {}
//
// export let state: AppPropsType = {
//     profilePage:  {
//         posts: [
//             {id: 1, message: "Hi, how are you?", likesCount: 12},
//             {id: 2, message: "It's my first post", likesCount: 10},
//             {id: 3, message: "Blabla", likesCount: 10},
//             {id: 4, message: "Dada", likesCount: 10},
//         ],
//         newPostText: 'it-kamasutra.com'
//     },
//     messagesPage: {
//         dialogs: [
//             {id: 1, name: "Dimych"},
//             {id: 2, name: "Alex"},
//             {id: 3, name: "Andrey"},
//             {id: 4, name: "Sveta"},
//             {id: 5, name: "Viktor"},
//             {id: 6, name: "Valera"},
//         ],
//         messages: [
//             {id: 1, message: "Hi"},
//             {id: 2, message: "How is your IT-KAMASUTRA"},
//             {id: 3, message: "Yo"},
//             {id: 4, message: "Yo"},
//             {id: 5, message: "Yo"},
//         ]
//     }
// }
//
// export const addPost = () => {
//    const newPost: PostsType = {
//         id: 5,
//         message: state.profilePage.newPostText,
//         likesCount: 0,
//     };
//     state.profilePage.posts.push(newPost)
//     state.profilePage.newPostText = '';
//     rerenderEntireTree()
// }
//
// export const updateNewPostText = (newText: string) => {
//     state.profilePage.newPostText = newText
//     rerenderEntireTree()
// }
//
// export const subscribe = (observer: () => void) => {
//     rerenderEntireTree = observer
// }