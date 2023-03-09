
const SEND_MESSAGE = "SN/dialogs/SEND_MESSAGE";

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
}

export const dialogsReducer = (state: DialogsInitialStateType = initialState, action: ActionsTypes): DialogsInitialStateType => {


    switch (action.type) {
        case SEND_MESSAGE:
           return {...state, messages: [...state.messages, {id: 6, message: action.newMessageBody}]}
    }
    return state
}

export const sendMessageCreator = (newMessageBody: string) =>
    ({type: SEND_MESSAGE, newMessageBody} as const)

export type DialogsInitialStateType = typeof initialState
type ActionsTypes = ReturnType<typeof sendMessageCreator>