import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import {userReducer} from "./users-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: userReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer);

//@ts-ignore
window.store = store