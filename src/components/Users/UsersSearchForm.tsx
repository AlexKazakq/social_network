import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/user-selectors";

const usersSearchFormValidate = (values: FormType) => {
    const errors = {};
    return errors;
}

type UserSearchFormType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = "true" | "false" | "null";
type FormType = {
    term: string,
    friend: FriendFormType
}
export const UsersSearchForm = ({onFilterChanged}: UserSearchFormType) => {

    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null
                : values.friend === 'true' ? true
                    : false
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }
    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}