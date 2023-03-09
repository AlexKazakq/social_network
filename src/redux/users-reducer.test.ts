import {usersReducer, UsersInitialStateType, followAC, unfollowAC} from "./users-reducer";
let state: UsersInitialStateType;
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Alex 1', followed: false, photos: {small: null, large: null}, status: 'status 0'},
            {id: 1, name: 'Alex 2', followed: false, photos: {small: null, large: null}, status: 'status 1'},
            {id: 2, name: 'Alex 3', followed: true, photos: {small: null, large: null}, status: 'status 2'},
            {id: 3, name: 'Alex 4', followed: true, photos: {small: null, large: null}, status: 'status 3'},
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        userId: null,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }
} )
test("follow success", () => {
    const newState = usersReducer(state, followAC(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("unfollow success", () => {
    const newState = usersReducer(state, unfollowAC(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})