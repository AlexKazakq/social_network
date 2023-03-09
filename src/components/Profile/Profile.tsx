import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatusThunk: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<void>
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatusThunk={props.updateStatusThunk}
                         saveProfile={props.saveProfile}
                         savePhoto={props.savePhoto}
            />
            <MyPostContainer/>
        </div>
    )
}