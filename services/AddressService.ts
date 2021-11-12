import {getDictricts_API, getProvices_API, getWards_API} from "../api/AddressAPI";
interface dataType{
    id:string,
    name:string
}
export const getProvices = async ()=>{
    const results = await getProvices_API();
    const data = results.data.map((item:dataType)=>{
        return {
            label:item.name,
            value:item.id
        }
    })
    return  data
}
export const getDictricts = async (provinceId:string)=>{
    const results = await getDictricts_API(provinceId);
    const data = results.data.map((item:dataType)=>{
        return {
            label:item.name,
            value:item.id
        }
    })
    return  data
}
export const getWards = async (dictrictId:string)=>{
    const results = await getWards_API(dictrictId);
    const data = results.data.map((item:dataType)=>{
        return {
            label:item.name,
            value:item.id
        }
    })
    return  data
}
