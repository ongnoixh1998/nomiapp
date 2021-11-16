import {fetchAPI} from "../utils/FetchAPI";
import {GHN_CANCEL, GHN_FEE, GHN_LIST, GHN_ORDER, GHN_SERVICE} from "./URL_CONSTANT";
import {GHNFINDTYPE} from "../services/GHNService";

export const findAll_API = async (orderId?:number)=>{
    return fetchAPI(GHN_LIST+(orderId?"?orderId="+orderId:''),"GET");
}
export const findByOrder_API = async (params:GHNFINDTYPE)=>{
    const requestParams = new URLSearchParams();
    if (params.orderId) requestParams.append("orderId",params.orderId);
    if (params.ghnOrder) requestParams.append("ghnOrder",params.ghnOrder)
    return  await fetchAPI(GHN_ORDER+"?"+requestParams.toString(),"GET");

}
export const getFee_API = async (token:string,params:any)=>{
    return  await fetchAPI(GHN_FEE+"?token="+token,"POST",params);
}
export const getServices_API = async (token:string,to_district:string)=>{
    return  await fetchAPI(GHN_SERVICE+"?token="+token+"&to_district="+to_district,"GET");
}
export const createAndUpdate_API = async (token:string,params:any)=>{
    return  await fetchAPI(GHN_ORDER+"?token="+token,"POST",params);
}
export const cancel_API = async (order_code:string)=>{
    return await fetchAPI(GHN_CANCEL+"?order_code="+order_code,"GET")
}
