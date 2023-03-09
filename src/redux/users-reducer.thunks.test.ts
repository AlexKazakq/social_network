import {
    followAC,
    followThunkCreator,
    toggleFollowingProgressAC,
    unfollowAC,
    unfollowThunkCreator
} from "./users-reducer";
import {usersAPI} from "../API/usersAPI";
import {APIResponseType, ResultCodesEnum} from "../API/api";

jest.mock("../API/usersAPI")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.getFollow.mockClear()
    userAPIMock.getUnfollow.mockClear()
})

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}


test('success follow thunk', async () => {
    userAPIMock.getFollow.mockReturnValue(Promise.resolve(result))
    const thunk = followThunkCreator(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followAC( 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgressAC(false, 1))
})

test('success unfollow thunk', async () => {
    userAPIMock.getUnfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollowThunkCreator(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgressAC(false, 1))
})