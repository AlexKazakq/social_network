import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Posts/Post";
import {ActionsTypes,  PostsType} from "../../../redux/state";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profile-reducer";

export type MyPostsCallBackType = {
    posts: PostsType[]
    newPostMessage: string
    dispatch: (action: ActionsTypes) => void
}



export const MyPosts = (props: MyPostsCallBackType) => {
    let postsElement = props.posts.map(p=> <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const onAddPostButtonHandler = () => {
            props.dispatch(addPostActionCreator())
    }

    let onPostChange = () => {
        let text = newPostElement.current?.value
        if (text || text === '') {
            props.dispatch(updateNewPostActionCreator(text))
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