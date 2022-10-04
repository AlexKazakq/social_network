import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Posts/Post";
import {MyPostsCallBackType} from "../Profile";


export const MyPosts = (props: MyPostsCallBackType) => {
    let postsElement = props.posts.map(p=> <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const onAddPostButtonHandler = () => {
        let text = newPostElement.current?.value
        if (text) {
            props.addPost(text)
        }

    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div><textarea ref = {newPostElement}></textarea></div>
                <div>
                    <button onClick={onAddPostButtonHandler}>Add post</button>
                    <button>Remove</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}