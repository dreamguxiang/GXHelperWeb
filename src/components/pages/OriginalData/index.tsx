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
        render: (bdsversion, record) => {
            if (record.tags === 'Release') {
                console.log(bdsversion);
                return (
                    <a href={ "https://minecraft.azureedge.net/bin-win/bedrock-server-"+bdsversion+".zip"}>{bdsversion}</a>
                )
            } else if (record.tags === 'Preview') {
                return (
                    <a href={ "https://minecraft.azureedge.net/bin-win-preview/bedrock-server-"+bdsversion+".zip"}>{bdsversion}</a>
                )
            }
        },
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
                window.open("https://github.com/dreamguxiang/OriginalData/raw/main/zip/"+ record.key+".zip");
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

let initdata = false;
export const OriginalData = () => {
    const [bottom, setBottom] = useState<TableShowVersion>();
    const [data, setData]  =  useState<DataType[]>(); // 用于存储从后端获取的数据

    if (bottom === undefined) {
        setBottom('all');
        initdata = false;
    }

    if (!initdata) {
        initdata = true;
        getOriginalDataList('all').then((res) => {
            console.log(res);
            setData(res);
        })
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
                        defaultValue={'all'}
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