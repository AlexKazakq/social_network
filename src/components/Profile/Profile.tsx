import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsTypes,  PostsType} from "../../redux/state";


export type ProfileCallbackProps = {
    posts: PostsType[]
    newPostMessage: string
    dispatch: (action: ActionsTypes) => void
}

export const Profile = (props: ProfileCallbackProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} dispatch={props.dispatch} newPostMessage={props.newPostMessage} />
        </div>
    )
}