import {login_api} from "../api/UserAPI";
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
export const getToken = async ()=>{
    return await useGetLocalStorage("user.token")
}
export const logout = async ()=>{
    console.log("logout")
    return await useRemoveLocalStorage("user.token")
}
export const register = ()=>{

}
