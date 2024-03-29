import React, { useState } from 'react';
import {Layout, Radio, Button, Table, Tag, Breadcrumb,message,notification} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {getOriginalDataList} from '../../services/getOriginalDataList';
import {
    DownloadOutlined
} from '@ant-design/icons';
import {downLoadFile} from "../../utils/downLoadFile";
const { Content } = Layout;

const topOptions = [
    { label: 'All', value: 'all' },
    { label: 'Release', value: 'release' },
    { label: 'Preview', value: 'preview' },
];

export const openNotification = () => {
    notification.open({
        message: 'Failed!',
        description:
            'The connection to the server was interrupted, please try again later.',
        duration: 5,
    });
};

const columns: ColumnsType<DataType> = [
    {
        title: 'BDS Version',
        dataIndex: 'bdsVersion',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => {
            let v1 = a.bdsVersion.toString().split('.');
            let v2 = b.bdsVersion.toString().split('.');
            const len = Math.max(v1.length, v2.length);
            for (let i = 0; i < len; i++) {
                const n1 = Number(v1[i] || 0);
                const n2 = Number(v2[i] || 0);
                if (n1 > n2) return -1;
                if (n1 < n2) return 1;
            }
            return 0;
        },
        key: 'bdsVersion',
        
    
    },
    {
        title: 'Update Time',
        dataIndex: 'updateTime',
        key: 'updateTime',
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
        render: (_, record) => {
            return (
                <Button type="primary" shape="round" icon={<DownloadOutlined/>} onClick={() => {
                    message.success('Please wait, downloading now!');
                    downLoadFile(record.download,"OriginalData-"+record.bdsVersion+".zip" )
                }
                }> Download</Button>
            )
        },
    },
];

export interface DataType {
    key: React.Key;
    bdsVersion: string;
    updateTime: string;
    tags: string;
    download: string;
}

type TableShowVersion =
    | 'all'
    | 'release'
    | 'preview';

let initdata = false;
export const OriginalData = () => {
    const [bottom, setBottom] = useState<TableShowVersion>();
    const [data, setData]  =  useState<DataType[]>(); // 用于存储从后端获取的数据
    const [loading, setLoading] = useState(false);

    if (bottom === undefined) {
        setBottom('all');
        initdata = false;
    }

    if (!initdata) {
        initdata = true;
        setLoading(true);
        getOriginalDataList('all').then((res) => {
            setLoading(false);
            setData(res);
        })
    }

    return (
        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Latest Release: </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div>
                    <Radio.Group
                        options={topOptions}
                        defaultValue={'all'}
                        onChange={(e) => {
                            setBottom(e.target.value)
                            setLoading(true);
                            getOriginalDataList(e.target.value).then((res) => {
                                setLoading(false);
                                return setData(res);
                            })
                        }}
                    />
                </div>
                <Table columns={columns}
                       dataSource={ data }
                       loading={loading}
                />
            </div>
        </Content>
    );
}
