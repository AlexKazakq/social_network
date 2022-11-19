import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/users-reducer";

type UsersPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (pageNumber:number) => void
}

export const Users = (props: UsersPropsType) => {

    const PAGES_LENGTH = 11;
    const totalPagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pagesCount = totalPagesCount < PAGES_LENGTH ? totalPagesCount : PAGES_LENGTH;
    const half = Math.floor(pagesCount / 2);
    let startPage = props.currentPage - half;
    if (startPage < 1) startPage = 1;
    if ((startPage + pagesCount) > totalPagesCount) startPage = totalPagesCount - pagesCount;

    const pages = [];
    for (let i = startPage; i < startPage + PAGES_LENGTH; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p => <span className={props.currentPage === p ? styles.selectorPages : ""}
                                      onClick={() => props.onPageChanged(p)}>{p}</span>)}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                   props.follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
};

