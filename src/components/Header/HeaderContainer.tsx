import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logoutTC} from "../../redux/auth-reducer";


type DataPropsType = {
    id: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type MapStatePropsType = {
    isAuth: boolean,
    login: string | null
}


type MapDispatchPropsType = {
    logout: () => void
}


type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainerAPI extends React.Component<HeaderContainerPropsType> {


    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export const HeaderContainer = connect(mapStateToProps,
    {
        logout: logoutTC
    })(HeaderContainerAPI)