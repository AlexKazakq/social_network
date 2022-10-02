import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export type AppPropsType = {
    posts?: PostsType[]
    dialogs?: DialogsType[]
    messages?: MessagesType[]
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
    id: number
    message: string
}

let posts: PostsType[] = [
    {id: 1, message: "Hi, how are you?", likesCount: 12},
    {id: 2, message: "It's my first post", likesCount: 10},
    {id: 3, message: "Blabla", likesCount: 10},
    {id: 4, message: "Dada", likesCount: 10},
]

let dialogs: DialogsType[] = [
    {id: 1, name: "Dimych"},
    {id: 2, name: "Alex"},
    {id: 3, name: "Andrey"},
    {id: 4, name: "Sveta"},
    {id: 5, name: "Viktor"},
    {id: 6, name: "Valera"},
];
let messages: MessagesType[] = [
    {id: 1, message: "Hi"},
    {id: 2, message: "How is your IT-KAMASUTRA"},
    {id: 3, message: "Yo"},
    {id: 4, message: "Yo"},
    {id: 5, message: "Yo"},
]


ReactDOM.render(
    <App posts={posts} dialogs={dialogs} messages={messages}/>,
  document.getElementById('root')
);