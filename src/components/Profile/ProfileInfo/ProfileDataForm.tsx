import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "./ProfileInfo.module.css"
import styleError from '../../../components/common/FormsControls/FormsControls.module.css'

export type ProfileFormDataType = {
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string
}

type ProfileDataFormPropsType = {
    profile: any
}
export const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType> & ProfileDataFormPropsType> = ({handleSubmit, profile, error}) => {
    return (<form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        {error &&
            <div className={styleError.formSummaryError}>
                {error}
            </div>
        }
        <div>
            <b>Full Name</b>: {createField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
        </div>
            <div>
                <b>My professional skills</b>: {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
        <div>
            <b>About me</b>: {createField('About me', 'aboutMe', [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => <div key={key} className={s.contact}>
            <b>{key}</b>: {createField(key, 'contacts.' + key, [], Input)}
        </div>)}
        </div>
    </form>)
}


// @ts-ignore
export const ProfileDataFormReduxForm = reduxForm<ProfileFormDataType, ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm)