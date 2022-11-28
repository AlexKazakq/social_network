import axios from "axios";

const baseUrl = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 5){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)},
    getProfile(userId: string) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getAuthMe() {
        return instance.get(baseUrl + `auth/me`)
            .then(response => response.data)
    },
    getFollow(id: number) {
        return instance.post(`follow/${id}`, {})
            .then(response => response.data.resultCode)
    },
    getUnfollow(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data.resultCode)
    }

}

