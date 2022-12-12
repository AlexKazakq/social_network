import React, {ComponentType} from "react";
import {Profile} from "./Profile";

import {connect} from "react-redux";
import {getStatusThunk, getUserProfileThunk, updateStatusThunk} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRiderect";
import {compose} from "redux";


type MapStatePropsType = {
    profile: any
    status: string
}

type MapDispatchPropsType = {
    getUserProfileThunk: (userId: string) => void
    getStatusThunk: (userId: string) => void
    updateStatusThunk: (status: string) => void
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
            userId = "26540";
        }
        this.props.getUserProfileThunk(userId)
        this.props.getStatusThunk(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatusThunk={this.props.updateStatusThunk}/>
        )
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})



export const ProfileContainer = compose<ComponentType>(
    connect(mapStateToProps, {getUserProfileThunk, getStatusThunk, updateStatusThunk}),
    withRouter
)
(ProfileAPIComponent);