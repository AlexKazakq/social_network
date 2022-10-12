import './index.css';
import {state, subscribe} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";
import {addPost, AppPropsType, updateNewPostText} from "./redux/state";
import React from "react";

let rerenderEntireTree = (state: AppPropsType) => {
    ReactDOM.render(
        <App
            state={state}
            addPost={addPost}
            updateNewPostText={updateNewPostText}
        />,
        document.getElementById("root")
    );
}

rerenderEntireTree(state);

subscribe(rerenderEntireTree)