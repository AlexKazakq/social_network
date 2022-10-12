import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Posts/Post";
import {PostsType} from "../../../redux/state";

export type MyPostsCallBackType = {
    posts: PostsType[]
    addPost: () => void
    newPostMessage: string
    updateNewPostText: (newText: string) => void
}

export const MyPosts = (props: MyPostsCallBackType) => {
    let postsElement = props.posts.map(p=> <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const onAddPostButtonHandler = () => {
            props.addPost()
    }

    let onPostChange = () => {
        let text = newPostElement.current?.value
        if (text || text === '') {
            props.updateNewPostText(text)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              ref={newPostElement}
                              value={props.newPostMessage}/>
                </div>
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