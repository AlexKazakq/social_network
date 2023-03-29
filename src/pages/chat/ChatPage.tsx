import {FC, memo, useEffect, useRef, useState} from "react";
import {ChatMessageAPIType} from "../../API/chatAPI";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";


export const ChatPage: FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat: FC = () => {

    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        // @ts-ignore
        dispatch(startMessagesListening());
        return () => {
            // @ts-ignore
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <div>
            {status === "error" && <div>Some error occurred. Please refresh the page</div>}
            <>
                <Messages/>
                <AddMessageChatForm/>
            </>
        </div>
    )
}

const Messages: FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [isAutoScrollIsActive, setIsAutoScrollIsActive] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScrollIsActive && setIsAutoScrollIsActive(true)
        } else {
            isAutoScrollIsActive && setIsAutoScrollIsActive(false)
        }
    }

    useEffect(() => {
        if (isAutoScrollIsActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{height: "400px", overflowY: "auto"}} onScroll={scrollHandler}>
            {messages.map((m, i) => <ChatMessage key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const ChatMessage: FC<{ message: ChatMessageAPIType }> = memo(({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: "30px"}}/> <b>{message.userName}</b>
            <br/>
            <b>{message.message}</b>
            <hr/>
        </div>
    )
})

const AddMessageChatForm: FC = () => {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
    debugger
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        // @ts-ignore
        dispatch(sendMessage(message))
        setMessage("")
    }
    return (
        <div>
            <div><textarea onChange={(e) => {
                setMessage(e.currentTarget.value)
            }} value={message}></textarea></div>
            <div>
                <button disabled={status === "ready"} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}