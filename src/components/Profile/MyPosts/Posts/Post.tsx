import React from "react";
import s from "./Post.module.css";

type PostPropsType = {
    message: string;
    likeCount: number;
}

export const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src="https://www.kino-teatr.ru/movie/kadr/36398/pv_82325.jpg" alt=""/>
            {props.message}
            <div><span>{props.likeCount} likes</span></div>
        </div>
    )
}