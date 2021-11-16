import {fetchAPI} from "../utils/FetchAPI";
import {
    ORDER_ACTION,
    ORDER_COUNT_BY_STATUS, ORDER_CREATE,
    ORDER_FINDALL,
    ORDER_FINDBYID,
    ORDER_TRACKING,
    QR_SCAN,
    TRACK_RECEIVE_PRODUCT
} from "./URL_CONSTANT";

export const findAll_API = async (params:URLSearchParams)=>{
    const respones = await fetchAPI(ORDER_FINDALL+"?"+params.toString(),"GET");
    return respones
}
export const findById_API = async (id:number)=>{
    const respones = await fetchAPI(ORDER_FINDBYID+"?id="+id,"GET");
    return respones
}
export const qrScan_API = async (id:string)=>{
    const respones = await fetchAPI(QR_SCAN+"?laddingcode="+id,"GET");
    return respones
}
export const receivePackage_API = async (id:number,packageReceived:number)=>{
    const respones = await fetchAPI(TRACK_RECEIVE_PRODUCT+"?id="+id+"&packagereceived="+packageReceived,"GET");
    return respones
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
