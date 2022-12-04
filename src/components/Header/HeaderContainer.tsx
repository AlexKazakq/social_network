import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserDataThunkCreator, setAuthUserDataAC} from "../../redux/auth-reducer";
import {authAPI} from "../../API/api";



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
    getAuthUserDataThunk: () => void
}


type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainerAPI extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.getAuthUserDataThunk()
    }

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
        getAuthUserDataThunk: getAuthUserDataThunkCreator,
})(HeaderContainerAPI)