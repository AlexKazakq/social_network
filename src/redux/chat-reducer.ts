import {Dispatch} from "redux";
import {BaseThunkType} from "./redux-store";
import {chatAPI, ChatMessageAPIType} from "../API/chatAPI";
import {v1} from "uuid";

type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

export const chatReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'social-network/chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages,...action.payload.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'social-network/chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export const messagesReceivedAC = (messages: ChatMessageAPIType[]) => ({
    type: 'social-network/chat/MESSAGES_RECEIVED',
    payload: messages
} as const)
export const statusChangedAC = (status: StatusType) => ({
    type: 'social-network/chat/STATUS_CHANGED',
    payload: {
        status
    }
} as const)

let _newMessageHandlerCreator: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) =>  {
    if (_newMessageHandlerCreator === null) {
        _newMessageHandlerCreator = messages => {
            dispatch(messagesReceivedAC(messages))
        }
    }
    return _newMessageHandlerCreator
}
let _statusChangedHandlerCreator: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) =>  {
    if (_statusChangedHandlerCreator === null) {
        _statusChangedHandlerCreator = status => {
            dispatch(statusChangedAC(status))
        }
    }
    return _statusChangedHandlerCreator
}


export const startMessagesListening = ():ThunkType => async (dispatch: Dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = ():ThunkType => async (dispatch: Dispatch) => {
    chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string):ThunkType => async (dispatch: Dispatch) => {
    chatAPI.sendMessage(message)
}


type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof messagesReceivedAC> | ReturnType<typeof statusChangedAC>
type ThunkType = BaseThunkType<ActionType>
export type StatusType = "pending" | "ready" | 'error';
