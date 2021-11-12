import {DeviceEventEmitter} from "react-native";

export const useAddEvent = (event:string,callback:any)=>{
    DeviceEventEmitter.addListener(event,callback);
}
export const useDispatchEvent = (event:string,data:any)=>{
    DeviceEventEmitter.emit(event,data);
}
export const useRemoveEvent = (event:string)=>{
    DeviceEventEmitter.removeAllListeners(event)
}
