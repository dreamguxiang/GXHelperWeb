import React, { useState } from 'react';
import {Layout ,Breadcrumb, Input, Typography,Button, message, Upload ,Form } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
const { Title } = Typography;
const { Content } = Layout;


export const PackEncrypted = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as RcFile);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
        maxCount: 1,
    };
    return (
        <Layout>
            <Layout className="site-layout">
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Typography>
                            <Title>Online Pack Encrypted</Title>
                        </Typography>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined/>}>Select File</Button>
                        </Upload>
                        <br />
                        <Form.Item
                            label="Key"
                            name="key"
                            rules={[{required: true, message: 'Please input your key!'}]}
                        ><Input/></Form.Item>
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{marginTop: 16}}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>

                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}