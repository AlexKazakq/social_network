import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Posts/Post";
import {ProfilePageType} from "../../../redux/state";

export const MyPosts = (props: ProfilePageType) => {
    let postsElement = props.posts.map(p=> <Post message={p.message} likesCount={p.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div><textarea></textarea></div>
                <div>
                    <button>Add post</button>
                    <button>Remove</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}