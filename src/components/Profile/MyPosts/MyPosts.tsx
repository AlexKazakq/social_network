import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Posts/Post";

export const MyPosts = () => {
    return (
        <div className={s.content}>
            <div className={s.posts}>
                my post
                <div>
                    <textarea></textarea>
                    <button>Add post</button>
                    <button>Remove</button>
                </div>
                <div className={s.posts}>
                    <Post message ={"Hi, how are you?"} likeCount ={15} />
                    <Post message ={"It's my first post"} likeCount ={20} />
                </div>
            </div>
        </div>
    )
}