import React, {ComponentType} from "react";
import {Profile} from "./Profile";

import {connect} from "react-redux";
import {getUserProfileThunk} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRiderect";
import {compose} from "redux";


type MapStatePropsType = {
    profile: any
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
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
})



export const ProfileContainer = compose<ComponentType>(
    connect(mapStateToProps, {getUserProfileThunk}),
    withRouter,
    withAuthRedirect
)
(ProfileAPIComponent);