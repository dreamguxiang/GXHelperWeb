import {DataType,openNotification} from "../pages/OriginalData";
import {baseURL} from "./baseUrl";


export const getOriginalDataList = async (bottom : string) => {
    //axios.get("/api/v1/getOriginalDataList")
    const req = await fetch(`/api/v1/getDataList`, {
        method: 'GET',
    });
    let dataSource: DataType[] = [];

    if (req.ok) {
        dataSource = await req.json();
    }else{
        openNotification()
    }
    switch (bottom) {
        case 'all':
            return dataSource;
        case 'release':
            return dataSource.filter(item => item.tags === 'Release');
        case 'preview':
            return dataSource.filter(item => item.tags === 'Preview');
        default:
            return dataSource;
    }
}