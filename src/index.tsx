import './index.css';
import {AppPropsType, store} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";

import React from "react";

export const rerenderEntireTree = () => {
    ReactDOM.render(
        <App
            store={store}
        />,
        document.getElementById("root")
    );
}

rerenderEntireTree();
store.subscribe(rerenderEntireTree)