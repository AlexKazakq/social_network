import React, {ComponentType, lazy, Suspense} from "react";
import "./App.css";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import {LaptopOutlined, UserOutlined, NotificationOutlined} from "@ant-design/icons";
import {Breadcrumb, Layout, Menu} from "antd";
import {UsersPage} from "./components/Users/UsersPage";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Setting} from "./components/Setting/Setting";
import {LoginPage} from "./Login/LoginPage";
import SubMenu from "antd/es/menu/SubMenu";
import {AppHeader} from "./components/Header/Header";

const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"))
// .then(({DialogsContainer}) => ({default: DialogsContainer})));

const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"))
// .then(({ProfileContainer}) => ({default: ProfileContainer})));
const ChatPage = lazy(() => import("./pages/chat/ChatPage").then(({ChatPage}) => ({default: ChatPage})))


type AppPropsType = {
    initialized: boolean
    initializeApp: () => void
}

class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert("some error occurred");

    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        const {Content, Footer, Sider} = Layout;

        return (
            <Layout>
                <AppHeader/>
                <Content style={{padding: "0 50px"}}>
                    <Breadcrumb style={{margin: "16px 0"}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{padding: "24px 0"}}>
                        <Sider width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={["1"]}
                                // defaultOpenKeys={["sub1"]}
                                style={{height: "100%"}}
                            >
                                <SubMenu key={'sub1'} icon={<UserOutlined/>} title={'My Profile'}>
                                    <Menu.Item key={'1'}><Link to={'/profile'}>Profile</Link></Menu.Item>
                                    <Menu.Item key={'2'}><Link to={'/dialogs'}>Messages</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key={'sub2'} icon={<LaptopOutlined/>} title={'Developers'}>
                                    <Menu.Item key={'1'}><Link to={'/developers'}>Developers</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key={'sub3'} icon={<NotificationOutlined/>} title={'Chat'}>
                                    <Menu.Item key={'1'}><Link to={'/chat'}>Chat</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: "0 24px", minHeight: 280}}>
                            <Suspense fallback={<div><Preloader/></div>}>
                                <Switch>
                                    <Route path={"/dialogs"} render={() => <DialogsContainer/>}/>
                                    <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                                    <Route path={"/developers"} render={() => <UsersPage pageTitle={"Samurai"}/>}/>
                                    <Route path={"/news"} render={() => <News/>}/>
                                    <Route path={"/music"} render={() => <Music/>}/>
                                    <Route path={"/setting"} render={() => <Setting/>}/>
                                    <Route path={"/login"} render={() => <LoginPage/>}/>
                                    <Route path={"/chat"} render={() => <ChatPage/>}/>
                                    <Route path={"/*"} render={() => <div>404 NOT FOUND</div>}/>
                                </Switch>
                            </Suspense>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: "center"}}>Ant Design ©2023 Created by Me</Footer>
            </Layout>
        );
    }
}


const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(connect(mapStateToProps, {initializeApp: initializeAppTC})(App)) as ComponentType;

export const SamuraiJsApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}