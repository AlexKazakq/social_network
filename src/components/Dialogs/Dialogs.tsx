import React from "react";
import s from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form/lib/reduxForm";

import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {DialogsInitialStateType} from "../../redux/dialogs-reducer";

export const Dialogs = (props: DialogsFromContainerType) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message}/>)

    const addNewMessage = (values: FormDataType) => {
        props.sendMessageCreator(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    );
};

let maxLength50 = maxLengthCreator(50)

const AddMessageForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>('Enter your message', 'newMessageBody', [requiredField, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

type DialogsFromContainerType = {
    dialogsPage: DialogsInitialStateType
    sendMessageCreator: (values: string) => void
}

type FormDataType = {
    newMessageBody: string
}
type NewMessageFormValuesKeysType = Extract<keyof FormDataType, string>
