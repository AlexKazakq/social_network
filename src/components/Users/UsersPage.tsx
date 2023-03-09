import React from "react";
import {useSelector} from "react-redux";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/user-selectors";


type UserPagePropsType = {
    pageTitle: string
}
export const UsersPage = (props: UserPagePropsType) => {
    const isFetching = useSelector(getIsFetching)
    return (
        <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
}

