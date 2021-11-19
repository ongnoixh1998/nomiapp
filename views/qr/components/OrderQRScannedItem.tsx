
import {Button, Divider, Stack, Text, Modal, VStack, HStack, Input} from "native-base";
import React, {memo, useCallback, useEffect, useState} from "react";
import {StyleSheet, TextInput, TouchableOpacity, View,Linking} from "react-native";
import NumberFormat from "react-number-format";
import {receivePackage, updateTrackPackage} from "../../../services/OrderService";
import {useNavigation} from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'
import {Picker} from "@react-native-picker/picker";
import NumberPickerDialog from "../../../components/NumberPickerDialog";
import CurrencyFormat from "../../../components/CurrencyFormat";

interface OrderQRScannedItemType {
    data:any,
    onChangeValue?:any
}
const EVENT = {
    PACKAGE:"PACKAGE",
    RECEIVE:"RECEIVE"
}
const OrderQRScannedItem = ({data,onChangeValue}:OrderQRScannedItemType)=>{
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false)
    const [packageReceived,setPackageReceived] = useState<any>(0)
    const [numberPicker,setNumberPicker] = useState(false);
    const [defaultValuePicker,setDefaulValuePicker] = useState('')
    const [event,setEvent] = useState<string>('');
    useEffect(()=>{
        setPackageReceived(data.countPackage?data.countPackage:0);
    },[])
    const getStatusName = (status:string)=>{
        let statusName = "Chưa nhận hàng";
        switch (status) {
            case "received":statusName =  "Đã nhận hàng";break;
            case "dilivered": statusName= "Đã tạo đơn GHN";break
            default: statusName= "Chưa nhận hàng";
        }9
        statusName+=" ("+(data.packageReceived?data.packageReceived:0)+"/"+(data.countPackage?data.countPackage:0)+")"
        return statusName;
    }
    const getColor = (status:string) => {
        switch (status) {
            case "received":return {backgroundColor: "#13f305", color: "#484848"}
            case "dilivered": return {backgroundColor: "#f5811f", color: "#303030"}
            default:return {backgroundColor: "#7607f6", color: "#f6f6f6"}
        }
    }
    const handleCreateGHN = ()=>{
        // @ts-ignore
        navigation.navigate("ghndetail",{
            id:data.id
        });
    }
    const toggleModal = ()=>{
        setShowModal(!showModal);
    }
    const handleGet = (value:number)=>{
        receivePackage(data.trackingId,value).then((results)=>{
            if (results.success){
                onChangeValue('viStatusCode','received',data.trackingId,value)
            }
        })
    }
    const gotoTrackingOrderScreen = ()=>{
        console.log(data);
        // @ts-ignore
        navigation.navigate("trackingorder",{
            id:data.id
        });
    }
    const gotoCall = ()=>{
        Linking.openURL(`tel:${data.phoneNumber}`)
    }
    const openNumberPicker = (event?:string)=>{
        setNumberPicker(!numberPicker);
        if (event){
            setEvent(event);
            if (event===EVENT.RECEIVE){
                setDefaulValuePicker(data.countPackage);
                console.log("receive")
            }else {
                setDefaulValuePicker('');
                console.log("defaul")
            }
        }
    }
    const onChangeValuePackage = useCallback((value:any)=>{

        setEvent((eventData) =>{

            switch (eventData){
                case EVENT.PACKAGE:
                    updateTrackPackage(data.trackingId,value).then((results)=>{
                        onChangeValue('countPackage',value,data.trackingId)
                    })
                    break;
                case EVENT.RECEIVE:
                    handleGet(value);
                    break;
                default: console.log("asdasd");
            }
            return eventData
        })



    },[])

    const renderModal = ()=>{
        return(
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Header>Số kiện nhận</Modal.Header>
                    <Modal.Body>
                        <VStack space={3}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontWeight="medium">Số kiện</Text>

                                <Input borderWidth={0}
                                       value={packageReceived.toString()}
                                       keyboardType={'numeric'}
                                       onChangeText={(text)=>setPackageReceived(text)}
                                       placeholder={'số kiện'}/>
                            </HStack>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            flex="1">
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        )
    }
    return(
        <View style={{backgroundColor:"#fff",borderRadius:10,padding:10}}>
           <View style={{...styles.row}}>
               <Text style={styles.fontBold}>
                   Tên SP:
                   <Text style={{...styles.fontBold,color:"#9702f3"}}>{data.productName}</Text>
               </Text>
               <TouchableOpacity onPress={()=>openNumberPicker(EVENT.PACKAGE)}>
                   <Text style={{backgroundColor:"#4296f6",padding:5,borderRadius:10,fontWeight:"bold",color:"#fff",overflow:'hidden'}}>Số kiện:{data.countPackage?data.countPackage:'Không có'}</Text>
               </TouchableOpacity>
           </View>
            <View style={{...styles.row}}>
                <Text style={styles.fontBold}>Đơn hàng:{data.id}</Text>
                <TouchableOpacity onPress={()=>openNumberPicker(EVENT.RECEIVE)}>
                    <Text style={{...getColor(data.viStatusCode),padding:5,borderRadius:10,fontWeight:"bold",color:"#fff",overflow:'hidden'}}>{getStatusName(data.viStatusCode)}</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row",flexWrap:"wrap",marginTop:10}}>
                <VStack space={'3'} style={{width:'70%'}}>
                    <View style={{...styles.row,paddingRight:50}}>
                        <Text style={{fontWeight:"bold"}}>Tên khách:</Text>
                        <Text style={{fontWeight:"bold",color:"#fd4b04"}}>{data.fullName}</Text>
                    </View>
                    <View style={{...styles.row,paddingRight:50}}>
                        <Text style={{fontWeight:"bold"}}>Tổng đơn:</Text>
                        <CurrencyFormat value={data.orderAmount} surfix={'đ'} style={{fontWeight:"bold",color:"#fd4b04"}}/>
                    </View>
                    <View style={{...styles.row,paddingRight:50}}>
                        <Text style={{fontWeight:"bold"}}>Đã thanh toán:</Text>
                        <CurrencyFormat value={data.paid} surfix={'đ'} style={{fontWeight:"bold",color:"#fd4b04"}}/>
                    </View>
                    <View style={{...styles.row,paddingRight:50}}>
                        <Text style={{fontWeight:"bold"}}>COD:</Text>
                        <CurrencyFormat value={String((data.orderAmount - data.paid))} surfix={'đ'} style={{fontWeight:"bold",color:"#fd4b04"}}/>
                    </View>

                </VStack>
                <VStack space={'3'} style={{width:'30%',alignItems:"flex-end"}}>
                    <TouchableOpacity onPress={gotoCall}>
                        <Feather name={'phone-call'} size={25} color={'#ff0000'} />
                    </TouchableOpacity>
                    <Button onPress={handleCreateGHN}>Tạo GHN</Button>
                    <Button backgroundColor={'purple.500'}
                            style={{marginTop:10}}
                            onPress={gotoTrackingOrderScreen}>Xem TTVC</Button>
                </VStack>
            </View>
            <View style={{...styles.row}}>
                <Text style={styles.fontBold}>Địa chỉ:{data.fullAddress}</Text>
            </View>
            <NumberPickerDialog isOpen={numberPicker}
                                defaultValue={defaultValuePicker}
                                onChangeValue={onChangeValuePackage}/>


            {renderModal()}
        </View>
    )
}
const styles = StyleSheet.create({
    row:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      marginTop:5,
        marginBottom:5
    },
    fontBold:{
        fontWeight:'bold'
    }
})
export default memo(OrderQRScannedItem)
