import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {
    ActionsTypes,
    DialogPageType,
} from "../../redux/state";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";

type DialogDispatchPageType = {
    dialogsState: DialogPageType
    dispatch: (action: ActionsTypes) => void
}

export const Dialogs = (props: DialogDispatchPageType) => {

    let dialogsElements = props.dialogsState.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsState.messages.map(m => <Message message={m.message}/>)
    let newMessageBody = props.dialogsState.newMessageBody

    const onSendMessageHandler = () => {
        props.dispatch(sendMessageCreator())
    }

    const onChangeNewMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.dispatch(updateNewMessageBodyCreator(body))
    }

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

