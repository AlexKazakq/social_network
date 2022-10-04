import React from "react";
import "./App.css";
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile, } from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Setting} from "./components/Setting/Setting";
import {PostsType, StatePropsType} from "./redux/state";

export type ProfileCallbackProps = {
    posts: PostsType[]
    addPost: (postMessage: string) => void
}

const App = (props: StatePropsType) => {
    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path={'/dialogs'} render={() => <Dialogs dialogs={props.state.messagesPage.dialogs} messages={props.state.messagesPage.messages}/>}/>
                    <Route path={'/profile'} render={() => <Profile posts={props.state.profilePage.posts} addPost={props.addPost}/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/setting'} render={() => <Setting/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}



export default App;
