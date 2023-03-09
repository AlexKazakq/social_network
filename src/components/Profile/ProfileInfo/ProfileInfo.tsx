import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import {ProfileDataFormReduxForm} from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

export const ProfileInfo = ({profile, status, updateStatusThunk, isOwner, savePhoto, saveProfile}: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(profile).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={()=> setEditMode(true)}/>}

                <ProfileStatusWithHooks status={status} updateStatusThunk={updateStatusThunk}/>
            </div>
        </div>
    );
};

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {
    return (<div>
        { isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full Name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>)}
        </div>
    </div>)
}


const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatusThunk: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<void>
}
type ContactPropsType = {
    contactTitle: string,
    contactValue: string
}
type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean
    goToEditMode: () => void
}