import React, { useState } from 'react';
import {Layout, Radio, Button, Table, Tag, Breadcrumb} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {getOriginalDataList} from '../../services/getOriginalDataList';
import {
    DownloadOutlined
} from '@ant-design/icons';
const { Content } = Layout;

const topOptions = [
    { label: 'All', value: 'all' },
    { label: 'Release', value: 'release' },
    { label: 'Preview', value: 'preview' },
];


const columns: ColumnsType<DataType> = [
    {
        title: 'BDS Version',
        dataIndex: 'bdsversion',
        key: 'bdsversion',
        render: (bdsVersion) => <p>{bdsVersion}</p>,
    },
    {
        title: 'Update Time',
        dataIndex: 'updatetime',
        key: 'updatetime',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, record) => {
            let color = record.tags === 'Release' ? 'green' : 'gold';
            return (
            <Tag color={color} key={record.tags}>{ record.tags.toUpperCase()}</Tag>
            )
        },
    },
    {
        title: 'Download',
        dataIndex: 'download',
        key: 'download',
        render: (_, record) => (
            <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={() => {
                window.open(record.Download);
            }
            } > Download </Button>
        ),
    },
];
export interface DataType {
    key: React.Key;
    bdsVersion: string;
    updateTime: string;
    tags: string;
    Download: string;
}


type TableShowVersion =
    | 'all'
    | 'release'
    | 'preview';

let initData = 0;
export const OriginalData = () => {
    const [bottom, setBottom] = useState<TableShowVersion>('all');
    const [data, setData]  =  useState<DataType[]>(); // 用于存储从后端获取的数据

    if (initData === 0) {
        initData = 1;
        getOriginalDataList(bottom).then((dataSource) => {
            setData(dataSource);
        });
    }

    return (
        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>OriginalData</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div>
                    <Radio.Group
                        options={topOptions}
                        defaultValue={bottom}
                        onChange={(e) => {
                            setBottom(e.target.value)
                            getOriginalDataList(e.target.value).then((res) => {
                                return setData(res);
                            })
                        }}
                    />
                </div>
                <Table columns={columns} dataSource={ data } />
            </div>
        </Content>
    );
}