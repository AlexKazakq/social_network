import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Posts/Post";

export type PostsType = {
    id?: number
    message: string
    likesCount: number
}

export type MyPostsCallBackType = {
    posts: PostsType[]
    newPostText: string
    updateNewPost: (text: string) => void
    addPost: () => void
}


export const MyPosts = (props: MyPostsCallBackType) => {
    let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const onAddPostButtonHandler = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current?.value
        if (text || text === "") {
            props.updateNewPost(text);
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              ref={newPostElement}
                              value={props.newPostText}/>
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