import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserDataAC} from "../../redux/auth-reducer";
import {usersAPI} from "../../API/api";



type dataPropsType = {
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
    setAuthUserData: (data: dataPropsType) => void
}


type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainerAPI extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        usersAPI.getAuthMe().then(data => {
                if (data.resultCode === 0) {
                    this.props.setAuthUserData(data.data)
                }
            })
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export const HeaderContainer = connect(mapStateToProps, {setAuthUserData: setAuthUserDataAC})(HeaderContainerAPI)