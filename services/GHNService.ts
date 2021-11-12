import {createAndUpdate_API, findByOrder_API, getFee_API, getServices_API} from "../api/GHNAPI";
export interface GHNFINDTYPE {
    orderId?:string,
    ghnOrder?:string
}
export const findByOrder = async (params:GHNFINDTYPE)=>{
    const results  = await findByOrder_API(params);
    results.provinces = results.provinces.map((item:any)=>{
        return {
            label:item.name,
            value:item.id
        }
    })
    results.dictricts = results.dictricts.map((item:any)=>{
        return {
            label:item.name,
            value:item.id
        }
    })
    results.wards = results.wards.map((item:any)=>{
        return {
            label:item.name,
            value:item.id
        }
    })
    return results
}
export const getFee = async (token:string,params:any)=>{
    const results = await getFee_API(token,params);
    return results;
}
export const getServices = async (token:string,to_dictrict:string)=>{
    return await getServices_API(token,to_dictrict)
}
export const createAndUpdate = async (token:string,params:any)=>{
    return await createAndUpdate_API(token,params);
}
export const paymentTypeOptions =() =>{
    return [
        {
            label: "Cửa hàng trả phí",
            value: 1
        },
        {
            label: "Khách hàng trả phí",
            value: 2
        }
    ]
}
export const deliveryNoteOptions = () =>{
    return [
        {
            label: "Cho thử hàng",
            value: "CHOTHUHANG"
        },
        {
            label: "Cho khách xem hàng",
            value: "CHOXEMHANGKHONGTHU"
        },
        {
            label: "Không cho khách xem hàng",
            value: "KHONGCHOXEMHANG"
        }
    ]
}
