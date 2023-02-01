import "./index.css";
import {store} from "./redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App";

import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
