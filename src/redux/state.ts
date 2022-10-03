import App from "../App";

export type StatePropsType = {
    state: AppPropsType
}

export type ProfilePageType = {
    posts: PostsType[]
}

export type MessagesPageType = {
    messages: MessagesType[]
    dialogs: DialogsType[]
}

export type AppPropsType = {
    profilePage : ProfilePageType
   messagesPage: MessagesPageType
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

export let state: AppPropsType = {
    profilePage: {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 12},
            {id: 2, message: "It's my first post", likesCount: 10},
            {id: 3, message: "Blabla", likesCount: 10},
            {id: 4, message: "Dada", likesCount: 10},
        ],
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
}
