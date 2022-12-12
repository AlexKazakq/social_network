import React from "react";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {InitialStateType} from "../../../redux/profile-reducer";
import {Dispatch} from "redux";


type MapDispatchPropsType = {
    addPost: () => void,
    updateNewPost: (text: string) => void
}

let mapStateToProps = (state: AppStateType):InitialStateType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: null,
        status: ''
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        updateNewPost: (text: string) => {
            dispatch(updateNewPostActionCreator(text))
        }
    }

}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);