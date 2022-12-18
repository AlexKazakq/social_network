import React from "react";
import s from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogPageType} from "../../redux/store";
import {Field, reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form/lib/reduxForm";

import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControls/FormsControls";

type DialogsFromContainerType = {
    dialogsPage: DialogPageType
    onSendMessage: (values: string) => void
    isAuth: boolean
}

type FormDataType = {
    newMessageBody: string
}

export const Dialogs = (props: DialogsFromContainerType) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message}/>)
    // let newMessageBody = state.newMessageBody

    const addNewMessage = (values: FormDataType) => {
        props.onSendMessage(values.newMessageBody)
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
                <Field name={'newPostText'} component={Textarea} validate={[requiredField, maxLength50]} placeholder={'Enter your message'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

