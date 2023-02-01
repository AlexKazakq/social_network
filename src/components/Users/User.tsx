import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


type UserPropsType = {
    user: UserType
    followingInProgress: number[],
    followThunk: (userID: number) => void
    unfollowThunk: (userID: number) => void
}

export const User = ({user, followingInProgress, followThunk, unfollowThunk }: UserPropsType) => {
    return (
             <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                                          className={styles.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {unfollowThunk(user.id)}}>Unfollow</button>
                                : <button  disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {followThunk(user.id)}}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                </div>)
};

