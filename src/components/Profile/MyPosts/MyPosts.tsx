import React, {memo} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Posts/Post";
import {Field, reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

export type PostsType = {
    id?: number
    message: string
    likesCount: number
}

export type MyPostsCallBackType = {
    posts: PostsType[]
    addPost: (newPostText: string) => void
}

type FormDataType = {
    newPostText: string
}


export const MyPosts = memo((props: MyPostsCallBackType) => {
    let postsElement = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onAddPostButtonHandler = (values: FormDataType) => {
        props.addPost(values.newPostText);
    }


    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <AddNewPostFormRedux onSubmit={onAddPostButtonHandler}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
})

let maxLength10 = maxLengthCreator(10)

let AddNewPostForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea} validate={[requiredField, maxLength10]} placeholder={'Post message'}/>
            </div>
            <div>
                <button>Add post</button>
                <button>Remove</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm<FormDataType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)