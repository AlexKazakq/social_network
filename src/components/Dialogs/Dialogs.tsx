import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogPageType} from "../../redux/store";
import {Redirect} from "react-router-dom";

type DialogsFromContainerType = {
    dialogsPage: DialogPageType
    updateNewMessage: (body: string) => void
    onSendMessage: () => void
    isAuth: boolean
}

export const Dialogs = (props: DialogsFromContainerType) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements =  state.messages.map(m => <Message key={m.id} message={m.message}/>)
    let newMessageBody =  state.newMessageBody

    const onSendMessageHandler = () => {
        props.onSendMessage()

    }

    const onChangeNewMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.updateNewMessage(body);
    }

    if (!props.isAuth) return <Redirect to={'login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <div>
                <div><textarea value={newMessageBody}
                               onChange={onChangeNewMessageHandler}
                               placeholder={"Enter your message"}></textarea></div>
                <div>
                    <button onClick={onSendMessageHandler}>Send</button>
                </div>
            </div>
        </div>
    );
};

