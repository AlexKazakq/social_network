import {StatusType} from "../redux/chat-reducer";

const subscribers = {
    'message-received': [] as MessagesReceivedSubscribesType[],
    'status-changed': [] as StatusChangedSubscribesType[]
}

let ws: WebSocket | null = null;
type EventsNameType = 'message-received' | 'status-changed'
const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChanel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['message-received'].forEach(s => s(newMessages))
};

const cleanUp = () => {
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s('pending'))
}

function createChanel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNameType, callback: MessagesReceivedSubscribesType | StatusChangedSubscribesType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNameType, callback: MessagesReceivedSubscribesType | StatusChangedSubscribesType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessagesReceivedSubscribesType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscribesType = (status: StatusType) => void

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}