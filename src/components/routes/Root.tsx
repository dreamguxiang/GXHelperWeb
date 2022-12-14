import React, { useState } from 'react';
import '../App.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {NavLink,useLocation, useRoutes} from "react-router-dom";
import {Home} from '../routes/Home';
import {OriginalDataInit} from "./OriginalData";
import {PackEncryptedInit} from "./PackEncrypted";

const { Header, Sider, Footer } = Layout;

export const Root = () => {
    const [collapsed, setCollapsed] = useState(false);
    const  location = useLocation();

    const GetRoutes = () => {
        const routes = useRoutes([
            {
                path:'/originaldata',
                element: <OriginalDataInit />,
            },
            {
                path:'/PackEncrypted',
                element: <PackEncryptedInit />,
            },
            {
                path:'/',
                element: <Home />
            }
        ]);
        return routes;
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/',
                            icon: <UserOutlined />,
                            label: (
                                <NavLink to="/" >Home</NavLink>
                            ),
                        },
                        {
                            key: '/OriginalData',
                            icon: <VideoCameraOutlined />,
                            label: (
                                <NavLink to="/OriginalData" >BDS Original Data</NavLink>
                            ),
                        },
                        {
                            key: '/PackEncrypted',
                            icon: <UploadOutlined />,
                            label: (
                                <NavLink to="/PackEncrypted" >Pack Encrypted</NavLink>
                            ),
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <GetRoutes />
                <Footer style={{ textAlign: 'center' }}>GXHelper ??2022 Created by QingYu</Footer>
            </Layout>
        </Layout>
    );
};
