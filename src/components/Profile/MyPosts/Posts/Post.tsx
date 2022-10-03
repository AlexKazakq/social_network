import React from "react";
import s from "./Post.module.css";
import {PostsType} from "../../../../redux/state";



export const Post = (props: PostsType) => {
    return (
        <div className={s.item}>
            <img src="https://www.kino-teatr.ru/movie/kadr/36398/pv_82325.jpg" alt=""/>
            {props.message}
            <div><span>{props.likesCount} likes</span></div>
        </div>
    )
}