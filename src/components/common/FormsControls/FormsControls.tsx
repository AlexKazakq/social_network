import React from "react";
import s from "./FormsControls.module.css"
import {Field, WrappedFieldMetaProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";




type TextareaType = {
    input: inputType
    meta: metaType
    placeholder: string
    children: React.ReactNode
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
type metaType = WrappedFieldMetaProps

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

export function createField<T extends string>(placeholder: string | undefined,
                            name: T,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<TextareaType>,
                            props = {},
                            text = '')
{
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