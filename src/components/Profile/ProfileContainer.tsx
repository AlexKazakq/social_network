import React from "react";
import {Profile} from "./Profile";

import {connect} from "react-redux";
import {getUserProfileThunk} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";



type MapStatePropsType = {
    profile: any
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfileThunk: (userId: string) => void
}


type PathParamsType = {
    userId: string
}
type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

export class ProfileAPIComponent extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2";
        }
        this.props.getUserProfileThunk(userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={'login'}/>
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let withUrlDataContainerComponent = withRouter(ProfileAPIComponent)

export const ProfileContainer = connect(mapStateToProps, {getUserProfileThunk})(withUrlDataContainerComponent)