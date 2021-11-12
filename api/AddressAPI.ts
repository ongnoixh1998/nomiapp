import {GETDICTRICTS_URL, GETPROVINCES_URL, GETWARDS_URL} from "./URL_CONSTANT";
import {fetchAPI} from "../utils/FetchAPI";

export const getProvices_API = async ()=>{
    const responses = await fetchAPI(GETPROVINCES_URL,"GET");
    return responses;
}
export const getDictricts_API = async (provinveId:string)=>{
    const responses = await fetchAPI(GETDICTRICTS_URL+"?provinceId="+provinveId,"GET");
    return responses;
}
export const getWards_API = async (dictrictId:string)=>{
    const responses = await fetchAPI(GETWARDS_URL+"?dictrictId="+dictrictId,"GET");
    return responses;
}
