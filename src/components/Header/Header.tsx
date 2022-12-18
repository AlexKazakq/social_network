import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean,
    login: string | null
    logout: () => void
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://upload.wikimedia.org/wikipedia/ru/c/ce/Logo_team_spirit.svg" alt=""/>

            <div className={s.loginBlock}>
                {props.isAuth ?
                    <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}