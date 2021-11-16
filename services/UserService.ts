import {checkToken_api, login_api} from "../api/UserAPI";
import {useGetLocalStorage, useRemoveLocalStorage, useSetLocalStorage} from "../utils/LocalStorageUtils";

export const login = async (username:string,password:string)=>{
    const responses = await login_api(username,password);
    if (responses.success){
        useSetLocalStorage("user.token",responses.token)
        return true;
    }else {
        return false;
    }
}
export const checkToken = async (token:string)=>{
    return await checkToken_api(token)
}
export const getToken = async ()=>{
    return await useGetLocalStorage("user.token")
}
export const logout = async ()=>{
    return await useRemoveLocalStorage("user.token")
}
export const register = ()=>{

}
