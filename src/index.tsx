import "./index.css";
import {store} from "./redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App";

import React from "react";
import {Provider} from "react-redux";

export const rerenderEntireTree = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById("root")
    );
}

rerenderEntireTree();
store.subscribe(() => {
    // let state = store.getState();
    rerenderEntireTree()
})