import {View,Text as TextReactNative} from "react-native";
import React from "react";
import {Stack,Text} from "native-base";
import moment from "moment";
interface TrackingOrderItemType {
    data:any

}
const TrackingOrderItem = ({data}:TrackingOrderItemType)=>{
    const getColorTracking = (status:string)=>{
        switch (status){
            case "SIGN": return {backgroundColor:"#029f18",color:"#fff"} ;
            case "DELIVERING": return {backgroundColor:"#fc9a04",color:"#fff"} ;
            case "TRANSPORT": return {backgroundColor:"#5908f3",color:"#fff"} ;
            default:return {backgroundColor:"#f8f8f8",color:"#fff"} ;
        }
    }
    return(
        <Stack style={{backgroundColor:"#fff",padding:10,borderRadius:10 }} space={'3'}>
            <Stack direction={'row'} space={'3'}>
                <Text bold={true}>Tên gói hàng:</Text>
                <Text bold={true} color={'purple.500'}>{data.name}</Text>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} space={'3'}>
                    <Text bold={true}>Tiền hàng:</Text>
                    <Text bold={true} color={'purple.500'}>{data.productAmount?data.productAmount:0} tệ</Text>
                </Stack>
                <TextReactNative style={{...getColorTracking(data.statusZh),padding:5,borderRadius:10,borderWidth:1,fontWeight:"bold"}}>
                    {data.status}
                </TextReactNative>
            </Stack>

            <Stack direction={'row'} space={'3'}>
                <Text bold={true}>Ngày đặt:</Text>
                <Text bold={true} color={'purple.500'}>{moment(data.dateOrder).format("DD/MM/YYYY")}</Text>
            </Stack>
            <Stack direction={'row'} space={'3'}>
                <Text bold={true}>Mã đơn hàngt:</Text>
                <Text bold={true} color={'purple.500'}>{data.orderCode}</Text>
            </Stack>
            <Stack direction={'row'} space={'3'}>
                <Text bold={true}>Vận đơn:</Text>
                <Text bold={true} color={'purple.500'}>{data.ladingCode}</Text>
            </Stack>
            <Stack direction={'row'} space={'3'}>
                <Text bold={true}>Hãng vận chuyển:</Text>
                <Text bold={true} color={'purple.500'}>{data.carrier?data.carrier:'Chưa có thông tin'}</Text>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} space={'3'}>
                    <Text bold={true}>Số kiện:</Text>
                    <Text bold={true} color={'purple.500'}>{data.packageNumber}</Text>
                </Stack>
                <Stack direction={'row'} space={'3'}>
                    <Text bold={true}>Đã nhận:</Text>
                    <Text bold={true} color={'purple.500'}>{data.packageReceived?data.packageReceived:0}</Text>
                </Stack>
            </Stack>

        </Stack>
    )
}
export default TrackingOrderItem
