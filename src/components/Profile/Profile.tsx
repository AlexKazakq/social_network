import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileCallbackProps} from "../../App";
import {PostsType} from "../../redux/state";


export type MyPostsCallBackType = {
    posts: PostsType[]
    addPost: (postMessage: string) => void
}

export const Profile = (props: ProfileCallbackProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addPost={props.addPost}/>
        </div>
    )
}