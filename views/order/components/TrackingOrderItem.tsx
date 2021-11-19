import {View, Text as TextReactNative, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {Stack, Text, VStack} from "native-base";
import moment from "moment";
import NumberPickerDialog from "../../../components/NumberPickerDialog";
import {updateTrackPackage} from "../../../services/OrderService";
interface TrackingOrderItemType {
    data:any,
    onChangeValue?:any

}
const TrackingOrderItem = ({data,onChangeValue}:TrackingOrderItemType)=>{
    const [numberPicker,setNumberPicker] = useState(false);

    const getColorTracking = (status:string)=>{
        switch (status){
            case "SIGN": return {backgroundColor:"#029f18",color:"#fff"} ;
            case "DELIVERING": return {backgroundColor:"#fc9a04",color:"#fff"} ;
            case "TRANSPORT": return {backgroundColor:"#5908f3",color:"#fff"} ;
            default:return {backgroundColor:"#f8f8f8",color:"#fff"} ;
        }
    }
    const onChangeValuePackage = (value:number)=>{
        updateTrackPackage(data.id,value).then((results)=>{
            if (onChangeValue){
                onChangeValue(value);
            }
        })
    }
    return(
        <View style={{flexDirection:"row",backgroundColor:"#fff",padding:10,borderRadius:10,overflow:"hidden"}}>
            <View style={{width:'60%'}}>
                <Stack style={{ }} space={'3'}>
                    <Stack direction={'row'} space={'3'}>
                        <Text bold={true}>Tên SP:</Text>
                        <Text bold={true} color={'purple.500'}>{data.name}</Text>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Stack direction={'row'} space={'3'}>
                            <Text bold={true}>Tiền hàng:</Text>
                            <Text bold={true} color={'purple.500'}>{data.productAmount?data.productAmount:0} tệ</Text>
                        </Stack>

                    </Stack>

                    <Stack direction={'row'} space={'3'}>
                        <Text bold={true}>Ngày đặt:</Text>
                        <Text bold={true} color={'purple.500'}>{moment(data.dateOrder).format("DD/MM")}</Text>
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
            </View>
            <VStack style={{width:"40%"}} space={'3'}>
                <TouchableOpacity onPress={()=>setNumberPicker(!numberPicker)}>
                    <TextReactNative style={{backgroundColor:"#01c80c",padding:5,borderRadius:10,borderWidth:1,fontWeight:"bold",color:"#fff"}}>
                        Số kiện:{data.packageNumber}
                    </TextReactNative>
                </TouchableOpacity>

                <View style={{backgroundColor:"#01c80c",padding:5,overflow:"hidden",borderRadius:10}}>
                    <TextReactNative style={{fontWeight:"bold"}}>Đã nhận: {data.packageReceived}/{data.packageNumber}</TextReactNative>
                    <TextReactNative style={{fontWeight:"bold"}}>Ngày: {moment(data.receiptDate).format("DD/MM")} </TextReactNative>
                </View>
            </VStack>
            <NumberPickerDialog isOpen={numberPicker}
                                onChangeValue={onChangeValuePackage}/>
        </View>

    )
}
export default TrackingOrderItem
