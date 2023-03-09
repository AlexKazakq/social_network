import {GetUsersResponseType, instance, APIResponseType} from "./api";

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 5, term: string = '', friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    getFollow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`, {})
            .then(response => response.data)
    },
    getUnfollow(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    }
}