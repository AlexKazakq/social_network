import React, {ComponentType} from "react";
import {DialogsInitialStateType, sendMessageCreator,} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRiderect";

//
// type MapDispatchPropsType = {
//     onSendMessage: (newMessageBody: string) => void
// }

type MapStateToPropsType = {
    dialogsPage: DialogsInitialStateType
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

// let mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType => {
//     return {
//         onSendMessage: (newMessageBody: string) => {
//             dispatch(sendMessageCreator(newMessageBody))
//         }
//     }
// }

export default compose<ComponentType>(
    connect(mapStateToProps, {sendMessageCreator}),
    withAuthRedirect
)(Dialogs)


