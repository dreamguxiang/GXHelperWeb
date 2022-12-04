import React, { Component } from 'react';
import {Breadcrumb,Typography,Divider} from "antd";
import {Layout} from 'antd';
const { Title,Paragraph,Text, } = Typography;
const { Content } = Layout;

export default class Home extends Component {
    render() {
        console.log("Home");
        return (
            <Layout>
                <Layout className="site-layout">
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Typography>
                                <Title>欢迎</Title>
                                <Paragraph>
                                    <Text strong>
                                        这里将提供BDS的原始数据，以及在线材质包加密功能！
                                    </Text>
                                </Paragraph>
                                <Divider/>
                            </Typography>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}