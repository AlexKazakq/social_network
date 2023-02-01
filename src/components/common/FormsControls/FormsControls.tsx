import React from "react";
import s from "./FormsControls.module.css"
import {Field} from "redux-form";

type TextareaType = {
    input: inputType
    meta: metaType
    placeholder: string
    children: any
}
type inputType = {
    name: string
    onBlur: any
    onChange: any
    onDragStart: any
    onDrop: any
    onFocus: any
    value: string
}
type metaType = {
    active: boolean
    asyncValidating: boolean
    autofilled: boolean
    dirty: boolean
    dispatch: any
    error: undefined | any
    form: string
    initial: undefined | any
    invalid: boolean
    pristine: boolean
    submitFailed: boolean
    submitting: boolean
    touched: boolean
    valid: boolean
    visited: boolean
    warning: undefined | any
}

const FormControl = ({meta: {touched, error}, children}: TextareaType) => {
    const hasError = touched && error

    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: TextareaType) => {

    const {input, meta, ...restProps} = props

    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}

export const Input = (props: TextareaType) => {
    const {input, meta, ...restProps} = props

    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}

export const createField = (placeholder: string | null, name: string, validators: any[], component: any, props = {}, text = '') => {
    return (
        <div>
            <Field placeholder={placeholder}
                   name={name}
                   component={component}
                   validate={validators}
                   {...props}
            />{text}
        </div>
    )
}