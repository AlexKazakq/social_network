import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../components/common/FormsControls/FormsControls";
import {requiredField} from "../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../redux/auth-reducer";
import {AppStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from "../components/common/FormsControls/FormsControls.module.css"

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginReduxFormType> & LoginReduxFormType> = ({
                                                                                                                handleSubmit,
                                                                                                                error,
                                                                                                                captchaUrl
                                                                                                            }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [requiredField], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [requiredField], Input, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", "captcha", [requiredField], Input)}

            {error &&
                <div className={s.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormDataType, LoginReduxFormType>({form: "login"})(LoginForm)

export const LoginPage = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormDataType) => {
        // @ts-ignore
        dispatch(loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
};


export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormDataType, string>

type LoginReduxFormType = {
    captchaUrl: string | null
}

