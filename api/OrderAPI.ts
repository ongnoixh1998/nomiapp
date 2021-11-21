import {fetchAPI} from "../utils/FetchAPI";
import {
    ORDER_ACTION,
    ORDER_COUNT_BY_STATUS, ORDER_CREATE,
    ORDER_FINDALL,
    ORDER_FINDBYID, ORDER_QUICKVIEW_UPDATE,
    ORDER_TRACKING,
    QR_SCAN, REPORT_STATISTIC_AREA,
    TRACK_RECEIVE_PRODUCT, UPDATE_TRACK_PACKAGE
} from "./URL_CONSTANT";

export const findAll_API = async (params:URLSearchParams)=>{
    const respones = await fetchAPI(ORDER_FINDALL+"?"+params.toString(),"GET");
    return respones
}
export const findById_API = async (id:number)=>{
    const respones = await fetchAPI(ORDER_FINDBYID+"?id="+id,"GET");
    return respones
}
export const quickViewUpdate_API= async (data:any)=>{
    return await fetchAPI(ORDER_QUICKVIEW_UPDATE,"POST",data);
}
export const qrScan_API = async (id:string)=>{
    const respones = await fetchAPI(QR_SCAN+"?laddingcode="+id,"GET");
    return respones
}
export const receivePackage_API = async (id:number,packageReceived:number)=>{
    const respones = await fetchAPI(TRACK_RECEIVE_PRODUCT+"?id="+id+"&packagereceived="+packageReceived,"GET");
    return respones
}
export const updateTrackPackage_API = async (trackId:number,trackPackage:number)=>{
    return await fetchAPI(UPDATE_TRACK_PACKAGE+"?trackId="+trackId+"&trackPackage="+trackPackage,"GET");
}
export const createAndUpdate_API = async (params:any)=>{
    const respones = await fetchAPI(ORDER_CREATE,"POST",params);
    return respones
}
export const action_API = async (action:string,ids:number[])=>{
    const paramsRequest = {
        action:action,
        ids:ids
    }
    return await fetchAPI(ORDER_ACTION,"POST",paramsRequest);
}
export const findAllTrackingOrder_API = async (id:number)=>{
    const respones = await fetchAPI(ORDER_TRACKING+"?orderId="+id,"GET");
    return respones
}
export const countByStatus_API = async (status:string)=>{
    const respones = await fetchAPI(ORDER_COUNT_BY_STATUS+"?status="+status,"GET");
    return respones
}

export const statisticArea_API = async (params:any)=>{
    const requestParams = new URLSearchParams();
    if (params.status) requestParams.append("status",params.status);
    if (params.option) requestParams.append("option",params.option);
    if (params.year) requestParams.append("year",params.year);
    if (params.host) requestParams.append("host",params.host);
    return await fetchAPI(REPORT_STATISTIC_AREA+"?"+requestParams.toString(),"GET");
}
