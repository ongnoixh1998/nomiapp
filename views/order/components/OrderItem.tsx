import {Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button, Divider, HStack, useToast, VStack} from "native-base";
import ViewShot, {captureRef} from "react-native-view-shot";
import Feather from "react-native-vector-icons/Feather";
import RNFS,{} from 'react-native-fs'
import RNFetchBlob from 'react-native-fetch-blob'

import CurrencyFormat from "../../../components/CurrencyFormat";
import NumberPickerDialog from "../../../components/NumberPickerDialog";
import {quickviewUpdate} from "../../../services/OrderService";

interface OrderItemType {
    data:any,
    onChangeCheck?:any,
    checked:boolean
}
const EVEN_QUICK_EDIT = {
    SHIP:"SHIP",
    PAID:"PAID",

}
const OrderItem = ({data,onChangeCheck,checked}:OrderItemType)=>{
    const toast = useToast();
    const [dataState,setDataState] = useState(data)
    const [quickEdit,setQuickEdit] = useState(false);
    const [defaultQuickEdit,setDefaultQuickEdit] = useState('0');
    const [eventQuickEdit,setEventQuickEdit] = useState('');
    useEffect(()=>{

    },[])
    const navigation = useNavigation();
    const capture = useRef<any>();

    const gotoDetail = ()=>{
        // @ts-ignore
        navigation.navigate('detail', {
            itemId: data.id,
        });
    }
    const gotoTrackingOrderScreen = ()=>{
        // @ts-ignore
        navigation.navigate("trackingorder",{
            id:data.id
        });
    }
    const gotoGHN = ()=>{
        // @ts-ignore
        navigation.navigate('ghnscreen',{
            orderId:data.id
        })
    }
    const getDateTime = (time:number) => {
        const now = new Date();
        const driff:number = now.getTime() - time;
        const second:number = parseInt(String(driff / 1000));
        const minute = parseInt(String(driff / (60 * 1000)));
        const hour = parseInt(String(driff / (60 * 60 * 1000)));
        const day = parseInt(String(driff / (24 * 60 * 60 * 1000)));
        if (day <= 0) {
            if (hour <= 0) {
                if (minute <= 0) {
                    return "Phút trước"
                } else {
                    return minute + " Phút trước";
                }
            } else {
                return hour + " Giờ trước";
            }
        } else {
            return moment(time).format("DD/MM/YYYY")
        }
    }
    const getStatusName = (status:string)=>{
        switch (status){
            case "pendding": return "Chờ thanh toán";
            case "cancel": return "Hủy đơn hàng";
            case "success": return "Đã hoàn thành";
            case "processing": return "Đang xử lý";
            case "failed": return "Thất bại";
            case "shipping": return "Đang vận chuyển";
            case "awaitingadditionaldelivery": return "Phát Bổ Sung";
            case "partiallypaid": return "Thanh toán một phần";
            case "paid": return "Đã thanh toán";
            case "refunded": return "Đã hoàn lại tiền";
            default: return status;
        }
    }
    const getColor = (status:string) => {
        switch (status) {
            case "pendding":
                return {backgroundColor: "#d2ef1d", color: "#d608ec"}
            case "cancel":
                return {backgroundColor: "red", color: "#000"}
            case "processing":
                return {backgroundColor: "#a15cea", color: "#ffffff"}
            case "failed":
                return {backgroundColor: "#ff0000", color: "#000"}
            case "shipping":
                return {backgroundColor: "#e8aa2b", color: "#000"}
            case "awaitingadditionaldelivery":
                return {backgroundColor: "#d2ef1d", color: "#000"}
            case "partiallypaid":
                return {backgroundColor: "#0e3ee5", color: "#ffffff"}
            case "paid":
                return {backgroundColor: "#0da225", color: "#000"}
            case "refunded":
                return {backgroundColor: "#f50bbb", color: "#ffffff"}
            case "success":
                return {backgroundColor: "#04f13f", color: "#000"}
        }
        return ""
    }
    const handleCheck = ()=>{
        if (onChangeCheck){
            onChangeCheck(data.id)
        }
    }
    const copyPhone = (phone:string)=>{
        Clipboard.setString(phone)
        toast.show({
            status:'success',
            placement:'top',
            title:'Thông báo',
            description:'Đã copy SDT thành công'
        })
    }
    const gotoCall = ()=>{
        Linking.openURL(`tel:${data.phoneNumber}`)
    }
    const captureSentToCustomer = ()=>{

        captureRef(capture, {
            format: "jpg",
            quality: 1,
            result:"base64"
        }).then(base64Data => {
            const dir  = RNFetchBlob.fs.dirs.PictureDir+"/nomiapp/";
            RNFetchBlob.fs.exists(dir).then((checked)=>{
                if (!checked){
                    RNFetchBlob.fs.mkdir(dir);
                }
            });
            const filename = dir+"nomiapp-"+new Date().getTime()+".jpg";
            RNFetchBlob.fs.writeFile(filename,base64Data,'base64').then((results)=>{

            });
            RNFetchBlob.fs.scanFile([ { path : filename, mime : 'image/jpg' } ]).then(() => {
              Linking.openURL("https://zalo.me/"+data.phoneNumber).then((results)=>{

              });
            })
        });


    }
    const getFileName = (filename:string)=>{
        return filename.substring(filename.lastIndexOf("/")+1,filename.length);
    }
    const toggleQuickEdit = (event:string)=>{
        switch (event){
            case EVEN_QUICK_EDIT.SHIP:setDefaultQuickEdit(dataState.ship);break;
            case EVEN_QUICK_EDIT.PAID:setDefaultQuickEdit(dataState.paid);break;
        }
        setQuickEdit(!quickEdit);
        setEventQuickEdit(event);
    }
    const onChangeValueQuickEdit = useCallback((value)=>{
        setDataState((prevDataState:any)=>{
            const newData = {...prevDataState};
            setEventQuickEdit((prevEvent)=>{
                switch (prevEvent){
                    case EVEN_QUICK_EDIT.PAID:
                        newData.paid = value
                        break;
                    case EVEN_QUICK_EDIT.SHIP:
                        newData.ship = value
                        break;
                }
                quickviewUpdate(newData).then((results)=>{})
                return prevEvent;
            })
            newData.orderAmount = parseInt(newData.productAmount)+parseInt(newData.ship);
            newData.profit = parseInt(newData.productAmount)-parseInt(newData.cost)-parseInt(newData.incurredCost);
            newData.cod = parseInt(newData.orderAmount)-parseInt(newData.paid);
            newData.profitMargin = parseFloat(String(newData.profit / newData.productAmount)).toFixed(2);
            return newData;
        })


    },[])

    return(
        <View style={styles.container}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:"space-between",borderBottomWidth:1,marginBottom:5,borderColor:"#ea6d09",padding:5}}>
                <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    <Text style={styles.fontBold}>Đơn hàng:</Text>
                    <Text style={styles.fontBold}>{data.orderCode}</Text>
                    <TouchableOpacity onPress={()=>copyPhone(data.phoneNumber)}>
                        <FontAwesome5  style={{...styles.fontBold,marginLeft:10}} name={'clone'}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{display:"flex",flexDirection:"row",alignItems:"center",paddingLeft:15}}>
                        <Text onPress={gotoDetail}
                              style={{...getColor(data.status),padding:5,borderRadius:10,fontWeight:"bold"}}>{getStatusName(data.status)}</Text>
                        <CheckBox value={checked} onChange={handleCheck}/>
                    </View>
                </View>
            </View>
            <ViewShot ref={capture} style={{backgroundColor:"#fff"}}>
                <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    <Text style={{color:"#0b21e5",fontWeight:"bold"}}>{getDateTime(dataState.createDate)}</Text>
                    <Text> - </Text>
                    <Text style={{fontWeight:"bold"}}>{dataState.fullName}</Text>

                </View>
                <View style={{flexDirection:"row",flexWrap:"wrap",marginTop:10}}>
                    <VStack space={'3'} style={{width:'60%'}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                            <Text style={{fontWeight:"bold"}}>Tiền hàng:</Text>
                            <CurrencyFormat value={dataState.productAmount} style={{fontWeight:"bold"}} surfix={'đ'}/>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                            <Text style={{fontWeight:"bold"}}>Tiền ship:</Text>
                            <TouchableOpacity onPress={()=>toggleQuickEdit(EVEN_QUICK_EDIT.SHIP)}>
                                <CurrencyFormat value={dataState.ship} style={{fontWeight:"bold"}} surfix={'đ'}/>
                            </TouchableOpacity>

                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                            <Text style={{fontWeight:"bold"}}>Đã thanh toán:</Text>
                            <TouchableOpacity onPress={()=>toggleQuickEdit(EVEN_QUICK_EDIT.PAID)}>
                                <CurrencyFormat value={dataState.paid} style={{fontWeight:"bold"}} surfix={'đ'}/>
                            </TouchableOpacity>

                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                            <Text style={{fontWeight:"bold"}}>Tổng đơn:</Text>
                            <CurrencyFormat value={dataState.orderAmount} style={{fontWeight:"bold"}} surfix={'đ'}/>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                            <Text style={{fontWeight:"bold"}}>COD:</Text>
                            <CurrencyFormat value={String(dataState.orderAmount-dataState.paid)} style={{fontWeight:"bold"}} surfix={'đ'}/>
                        </View>
                    </VStack>
                    <VStack space={'3'} style={{width:'40%',alignItems:"flex-end"}}>
                        <TouchableOpacity onPress={gotoCall}>
                            <Feather name={'phone-call'} size={25} color={'#ff0000'} />
                        </TouchableOpacity>
                        <Button onPress={gotoTrackingOrderScreen}>{`Đơn TQ (${dataState.tracking.length})`}</Button>
                        <Button onPress={gotoGHN} backgroundColor={'purple.600'}>{`GHN (${dataState.ghn.length})`}</Button>
                        <Button onPress={captureSentToCustomer}>Gửi khách</Button>
                    </VStack>
                </View>
                <View>
                    <Text style={{fontWeight:"bold"}}>Địa chỉ:{dataState.fullAddress}</Text>
                </View>
            </ViewShot>
            <Divider marginTop={'3'} marginBottom={'3'}/>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <HStack space={'1'}>
                    <Text style={{fontWeight:"bold",paddingRight:20}}>Giá vốn:</Text>
                    <CurrencyFormat value={dataState.cost} style={{fontWeight:"bold",color:"#ff6500",paddingLeft:10}}  surfix={'đ'}/>
                </HStack>
                <Button backgroundColor={'purple.600'} onPress={gotoDetail}>Xem hóa đơn</Button>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <HStack space={'1'}>
                    <Text style={{fontWeight:"bold",paddingRight:20}}>Lợi nhuận:</Text>
                    <CurrencyFormat value={dataState.profit} style={{fontWeight:"bold",color:"#ff6500"}}   surfix={'đ'}/>
                </HStack>
                <HStack space={'1'}>
                    <Text style={{fontWeight:"bold",paddingRight:20}}>Tỉ xuất:</Text>
                    <Text style={{fontWeight:"bold",color:"#ff6500"}}>{Math.round((dataState.profitMargin*100))} %</Text>
                </HStack>

            </View>
            <NumberPickerDialog isOpen={quickEdit} onChangeValue={onChangeValueQuickEdit} defaultValue={defaultQuickEdit}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:"#fff",
        marginBottom:10,
        borderRadius:10
    },
    fontBold:{
        fontWeight:"bold"
    },
    row:{
        display:"flex",
        flexDirection:"row"
    },
    col40:{
        width:'30%',
        fontWeight:"bold",
        paddingTop:5,
        paddingBottom:5
    },
    col60:{
        width:'70%',
        fontWeight:"bold",
        paddingTop:5,
        paddingBottom:5
    }


});
export default memo(OrderItem);
