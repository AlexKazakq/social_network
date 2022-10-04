import React from "react";
import s from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogPageType} from "../../redux/state";

export const Dialogs = (props: DialogPageType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
};

