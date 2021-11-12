import {getToken} from "../services/UserService";

export const fetchAPI = async (url:string,method:string,data?:any)=>{
    console.log(url);
    let header = new Headers();
    header.append("Authorization",'Bearer '+await getToken());
    if (data){
        header.append("Content-Type",'application/json');
    }
    const options:any = {method:method,headers:header}
    if (data) options.body = JSON.stringify(data);
    const respones = await fetch(url,options)
    return respones.json();
}
