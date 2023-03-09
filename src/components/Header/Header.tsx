import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logoutTC} from "../../redux/auth-reducer";

export const AppHeader = () => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const dispatch = useDispatch()

    const logoutCallBack = () => {
        // @ts-ignore
        dispatch(logoutTC())
    }

    const {Header} = Layout;

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                        <Menu.Item key={"1"}><Link to={"/developers"}>Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                {isAuth ?
                    <>
                        <Col span={2}>
                            <Avatar alt={login || ""} style={{backgroundColor: "#87d068"}} icon={<UserOutlined/>}/>
                        </Col>
                        <Col span={4}>
                            <Button onClick={logoutCallBack}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={"/login"}>Login</Link>
                        </Button>
                    </Col>}
            </Row>
        </Header>
    )
}