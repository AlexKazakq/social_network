import React, {lazy, Suspense} from "react";
import "./App.css";
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Setting} from "./components/Setting/Setting";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {ContainerLogin} from "./Login/Login";
import {UsersContainer} from "./components/Users/UsersContainer";
import {connect, Provider} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";

// import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
const DialogsContainer = lazy(() =>
    import("./components/Dialogs/DialogsContainer")
        .then(({DialogsContainer}) => ({default: DialogsContainer})));

// import {ProfileContainer} from "./components/Profile/ProfileContainer";
const ProfileContainer = lazy(() =>
    import("./components/Profile/ProfileContainer")
        .then(({ProfileContainer}) => ({default: ProfileContainer})));


type AppPropsType = {
    initialized: boolean
    initializeApp: () => void
}

class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert('some error occurred');

    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={"app-wrapper"}>
                <HeaderContainer/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Suspense fallback={<div><Preloader/></div>}>
                        <Route path={"/dialogs"} render={() => <DialogsContainer/>}/>
                        <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                        <Route path={"/users"} render={() => <UsersContainer/>}/>
                        <Route path={"/news"} render={() => <News/>}/>
                        <Route path={"/music"} render={() => <Music/>}/>
                        <Route path={"/setting"} render={() => <Setting/>}/>
                        <Route path={"/login"} render={() => <ContainerLogin/>}/>
                    </Suspense>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps,
    {
        initializeApp: initializeAppTC,
    })(App);

export const SamuraiJsApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}