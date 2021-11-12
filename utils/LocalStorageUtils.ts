import AsyncStorage from '@react-native-async-storage/async-storage';
export const  useSetLocalStorage = (key:string,value:any,callback?:any)=>{
    AsyncStorage.setItem(key,JSON.stringify(value)).then(()=>{
        if (callback){
            callback({
                success:true
            })
        }
    })
}
export const useGetLocalStorage = async (key:string,callback?:any)=>{
    const data = await AsyncStorage.getItem(key);
    if (data){

        return JSON.parse(data);
    }
    return null;
}
export const useRemoveLocalStorage = async (key:string)=>{
    await AsyncStorage.removeItem(key)
    return true;
}
