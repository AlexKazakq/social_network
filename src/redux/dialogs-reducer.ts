import {ActionsTypes} from "./store";

const SEND_MESSAGE = "SEND_MESSAGE";

export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id?: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Alex"},
        {id: 3, name: "Andrey"},
        {id: 4, name: "Sveta"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"},
    ] as DialogsType[],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your IT-KAMASUTRA"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
    ] as MessagesType[],
    newMessageBody: ''
}

export type InitialStateType = typeof initialState



const dialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {


    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
           return {...state, messages: [...state.messages, {id: 6, message: body}]}
    }
    return state
}

export const sendMessageCreator = (newMessageBody: string) =>
    ({type: SEND_MESSAGE, newMessageBody} as const)

export default dialogsReducer