import react from "react";
import s from './FormsControls.module.css'

type TextareaType = {
    input:inputType
    meta:metaType
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

const FormControl = ({input, meta, ...props}: TextareaType) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
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

