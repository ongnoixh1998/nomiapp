import {LOGIN_URL} from "./URL_CONSTANT";

export const login_api = async (username:string,password:string)=>{
    const paramsRequest = new URLSearchParams();
    paramsRequest.append("username",username);
    paramsRequest.append("password",password);
    const responses = await fetch(LOGIN_URL+"?"+paramsRequest.toString(),{method:"GET"})
    return await responses.json();
}
