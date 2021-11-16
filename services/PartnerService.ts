import {findALl_API} from "../api/PartnerAPI";

export const findAll = async ()=>{
    const results = await findALl_API();
    const newData = results.data.map((item:any)=>{
        return {
            label:item.host,
            value:item.id
        }
    })
    return newData;
}
