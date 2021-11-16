import {fetchAPI} from "../utils/FetchAPI";
import {PARTNER_FINDALL} from "./URL_CONSTANT";

export const findALl_API = async ()=>{
    return await fetchAPI(PARTNER_FINDALL,"GET");
}
