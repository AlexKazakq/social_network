import {ActionsTypes, DialogPageType, PostsType} from "./state";
import profileReducer from "./profile-reducer";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

const dialogsReducer = (state: DialogPageType, action: ActionsTypes) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            break;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = ""
            state.messages.push({id: 6, message: body})
            break;
    }
    return state
}

export const updateNewMessageBodyCreator = (body: string) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body} as const)
export const sendMessageCreator = () =>
    ({type: SEND_MESSAGE} as const)

export default dialogsReducer