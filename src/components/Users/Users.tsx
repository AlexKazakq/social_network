import React from "react";
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";


type UsersPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: number[],
    followThunk: (userID: number) => void
    unfollowThunk: (userID: number) => void
}

export const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}: UsersPropsType) => {

    return (
        <div>
            <Paginator pageSize={pageSize} totalItemsCount={totalUsersCount} currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
            <div>{
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     followThunk={props.followThunk}
                                     unfollowThunk={props.unfollowThunk}
                                     key={u.id}/>)
            }</div>
        </div>
    );
};

