import React, {ChangeEvent} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatusThunk: (status: string) => void
}

type StateType  = {
    editMode: boolean,
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatusThunk(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status)
        this.setState({status: this.props.status})
        console.log('componentDidUpdate')
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.state.status || 'No status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode}
                               value={this.state.status}></input>
                    </div>
                }
            </div>
        );
    }
}

