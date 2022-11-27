import React from "react";
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserDataAC} from "../../redux/auth-reducer";


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
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let data = response.data.data
                    this.props.setAuthUserData(data)
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