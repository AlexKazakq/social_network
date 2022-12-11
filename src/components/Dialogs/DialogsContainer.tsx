import React, {ComponentType} from "react";
import {
    InitialStateType,
    sendMessageCreator,
    updateNewMessageBodyCreator
} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRiderect";


type MapDispatchPropsType = {
    updateNewMessage: (body: string) => void,
    onSendMessage: () => void
}

type MapStateToPropsType = {
    dialogsPage: InitialStateType
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType => {
    return {
        updateNewMessage: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        onSendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}

export const DialogsContainer = compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)


