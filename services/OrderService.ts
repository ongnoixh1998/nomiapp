import {
    countByStatus_API, createAndUpdate_API,
    findAll_API,
    findAllTrackingOrder_API,
    findById_API,
    qrScan_API,
    receivePackage_API
} from "../api/OrderAPI";

export const findAll = async (page:number,pageSize:number)=>{
    const params = new URLSearchParams();
    if (page) params.append("page",String(page));
    if (pageSize) params.append("pageSize",String(pageSize));

    const results = await findAll_API(params);
    return results;
}
export const findById = async (id:number)=>{
    return await findById_API(id);
}
export const qrScan = async (id:string)=>{
    return await qrScan_API(id);
}
export const receivePackage = async (id:number,packageReceived:number)=>{
    return await receivePackage_API(id,packageReceived);
}
export const findAllTrackingOrder = async (id:number)=>{
    const results = await findAllTrackingOrder_API(id);
    return results.success?results.data:[] ;
}
export const countByStatus = async (status:string)=>{
    return await countByStatus_API(status);
}
export const createAndUpdate = async (params:any)=>{
    return await createAndUpdate_API(params);
}
export const LISTSTATUS = [
    {
        title:'Đang xử lý',
        icon:'',
        value:0,
        status:'processing'
    },
    {
        title:'Chờ thanh toán',
        icon:'',
        value:0,
        status:'pendding'
    },
    {
        title:'Đã hoàn thành',
        icon:'',
        value:0,
        status:'success'
    },
    {
        title:'Đang vận chuyển',
        icon:'',
        value:0,
        status:'shipping'
    },

]
export const DISCOUNTTYPE = [
    {
        title:"Khuyến mãi theo %",
        icon:"percent",
        type:"PERCENT"
    },
    {
        title:"Khuyến mãi theo số tiền",
        icon:"dollar-sign",
        type:"CURRENCY"
    }
]
