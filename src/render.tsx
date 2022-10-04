import ReactDOM from "react-dom";
import App from "./App";
import {addPost, AppPropsType} from "./redux/state";
import React from "react";

export let rerenderEntireTree = (state: AppPropsType) => {
    ReactDOM.render(
        <App
            state={state}
    addPost={addPost}
    />,
    document.getElementById('root')
);
}