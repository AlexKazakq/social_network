import React, {useEffect} from "react";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, followThunkCreator, requestUsersTC, unfollowThunkCreator} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/user-selectors";
import {useHistory, useLocation} from "react-router-dom";


export const Users = () => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation();


    useEffect(() => {
        // @ts-ignore
        dispatch(requestUsersTC(currentPage, pageSize, filter))
    }, [])

    useEffect(() => {
        history.push({
            pathname: '/developers',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

    useEffect(() => {
        const query = new URLSearchParams(location.search);

        let actualPage = currentPage;
        let actualFilter = filter;

        const queryFriend = query.get("friend");
        const queryPage = query.get("page");
        const queryTerm = query.get("term");

        if (queryPage) actualPage = +queryPage;


        if (queryTerm)
            actualFilter = { ...actualFilter, term: queryTerm };

        switch (queryFriend) {
            case "null":

                actualFilter = { ...actualFilter, friend: null };

                break;
            case "true":

                actualFilter = { ...actualFilter, friend: true };
                break;
            case "false":

                actualFilter = { ...actualFilter, friend: false };
                break;
            default:
                break;
        }
        debugger
        // @ts-ignore
        dispatch(requestUsersTC(actualPage, pageSize, actualFilter));
    }, [location.search]);


    const onPageChanged = (pageNumber: number) => {
        // @ts-ignore
        dispatch(requestUsersTC(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        // @ts-ignore
        dispatch(requestUsersTC(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        // @ts-ignore
        dispatch(followThunkCreator(userId))
    }
    const unfollow = (userId: number) => {
        // @ts-ignore
        dispatch(unfollowThunkCreator(userId))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator pageSize={pageSize} totalItemsCount={totalUsersCount} currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
            <div>{
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     follow={follow}
                                     unfollow={unfollow}
                                     key={u.id}/>)
            }</div>
        </div>
    );
};

