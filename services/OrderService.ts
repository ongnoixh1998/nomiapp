import {
    action_API,
    countByStatus_API, createAndUpdate_API,
    findAll_API,
    findAllTrackingOrder_API,
    findById_API,
    qrScan_API,
    receivePackage_API, statisticArea_API, updateTrackPackage_API
} from "../api/OrderAPI";
export const actions = async (action:string,ids:number[])=>{
    return await action_API(action,ids)
}
export const findAll = async (page?:number,pageSize?:number,filter?:string,host?:number,keyword?:string)=>{
    const params = new URLSearchParams();
    if (page) params.append("page",String(page));
    if (pageSize) params.append("pageSize",String(pageSize));
    if (filter) params.append("status",filter);
    if (host) params.append("host",String(host));
    if (keyword) params.append("keyword",keyword);

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
export const updateTrackPackage = async (trackId:number,trackPackage:number)=>{
    return await updateTrackPackage_API(trackId,trackPackage);
}
export const statictisArea = async (params:{option:string,status:string,year:string,host:string})=>{
    return await statisticArea_API(params)
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
        title:'Chưa hoàn thành',
        icon:'',
        value:0,
        status:'incomplate'
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
interface SelectType {
    label:string,
    value:string
}
export const FILTERS_ORDER:any = [
    {label:"Tất cả", value:"all"},
    {label:"Theo dõi đơn hàng", value:"tracking"},
    {label:"Chưa hoàn thành", value:"incomplate"},
    {label:"Thùng rác", value:"trash"},
    {label:"Chờ thanh toán", value:"pendding"},
    {label:"Hủy đơn hàng", value:"cancel"},
    {label:"Đã hoàn thành", value:"success"},
    {label:"Đang xử lý", value:"processing"},
    {label:"Đang vận chuyển", value:"shipping"},
    {label:"Chờ Phát Bổ Sung", value:"awaitingadditionaldelivery"},
    {label:"Đã thanh một phầm", value:"partiallypaid"},
    {label:"Đã thanh toán", value:"paid"},
]
