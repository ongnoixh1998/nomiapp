import {Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {memo, useEffect} from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import NumberFormat from 'react-number-format';
import CheckBox from '@react-native-community/checkbox';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button, Divider, HStack, useToast, VStack} from "native-base";
import CurrencyFormat from "../../../components/CurrencyFormat";
import Feather from "react-native-vector-icons/Feather";
interface OrderItemType {
    data:any,
    onChangeCheck?:any,
    checked:boolean
}
const OrderItem = ({data,onChangeCheck,checked}:OrderItemType)=>{
    const toast = useToast();
    useEffect(()=>{

    },[])
    const navigation = useNavigation();
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
            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <Text style={{color:"#0b21e5",fontWeight:"bold"}}>{getDateTime(data.createDate)}</Text>
                <Text> - </Text>
                <Text style={{fontWeight:"bold"}}>{data.fullName}</Text>

            </View>
            <View style={{flexDirection:"row",flexWrap:"wrap",marginTop:10}}>
                <VStack space={'3'} style={{width:'60%'}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                        <Text style={{fontWeight:"bold"}}>Tiền hàng:</Text>
                        <CurrencyFormat value={data.productAmount} style={{fontWeight:"bold"}} surfix={'đ'}/>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                        <Text style={{fontWeight:"bold"}}>Tiền ship:</Text>
                        <CurrencyFormat value={data.ship} style={{fontWeight:"bold"}} surfix={'đ'}/>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                        <Text style={{fontWeight:"bold"}}>Đã thanh toán:</Text>
                        <CurrencyFormat value={data.paid} style={{fontWeight:"bold"}} surfix={'đ'}/>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                        <Text style={{fontWeight:"bold"}}>Tổng đơn:</Text>
                        <CurrencyFormat value={data.orderAmount} style={{fontWeight:"bold"}} surfix={'đ'}/>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:50}}>
                        <Text style={{fontWeight:"bold"}}>COD:</Text>
                        <CurrencyFormat value={String(data.orderAmount-data.paid)} style={{fontWeight:"bold"}} surfix={'đ'}/>
                    </View>
                </VStack>
                <VStack space={'3'} style={{width:'40%',alignItems:"flex-end"}}>
                    <TouchableOpacity onPress={gotoCall}>
                        <Feather name={'phone-call'} size={25} color={'#ff0000'} />
                    </TouchableOpacity>
                    <Button onPress={gotoTrackingOrderScreen}>{`Đơn TQ (${data.tracking.length})`}</Button>
                    <Button onPress={gotoGHN} backgroundColor={'purple.600'}>{`GHN (${data.ghn.length})`}</Button>
                </VStack>
            </View>
            <View>
                <Text style={{fontWeight:"bold"}}>Địa chỉ:{data.fullAddress}</Text>
            </View>
            <Divider marginTop={'3'} marginBottom={'3'}/>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <HStack space={'1'}>
                    <Text style={{fontWeight:"bold",paddingRight:20}}>Giá vốn:</Text>
                    <CurrencyFormat value={data.cost} style={{fontWeight:"bold",color:"#ff6500",paddingLeft:10}}  surfix={'đ'}/>
                </HStack>
                <Button backgroundColor={'purple.600'} onPress={gotoDetail}>Xem hóa đơn</Button>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <HStack space={'1'}>
                    <Text style={{fontWeight:"bold",paddingRight:20}}>Lợi nhuận:</Text>
                    <CurrencyFormat value={data.profit} style={{fontWeight:"bold",color:"#ff6500"}}   surfix={'đ'}/>
                </HStack>
                <HStack space={'1'}>
                    <Text style={{fontWeight:"bold",paddingRight:20}}>Tỉ xuất:</Text>
                    <Text style={{fontWeight:"bold",color:"#ff6500"}}>{Math.round((data.profitMargin*100))} %</Text>
                </HStack>

            </View>

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
