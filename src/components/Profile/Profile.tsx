import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostsType} from "../../redux/state";


export type ProfileCallbackProps = {
    posts: PostsType[]
    addPost: () => void
    newPostMessage: string
    updateNewPostText: (newText: string) => void
}

export const Profile = (props: ProfileCallbackProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addPost={props.addPost} newPostMessage={props.newPostMessage} updateNewPostText={props.updateNewPostText}/>
        </div>
    )
}