import {StyleSheet, Text, View} from "react-native";
import React, {memo, useEffect} from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import NumberFormat from 'react-number-format';
interface OrderItemType {
    data:any,

}
const OrderItem = ({data}:OrderItemType)=>{
    useEffect(()=>{

    })
    const navigation = useNavigation();
    const gotoDetail = ()=>{
        // @ts-ignore
        navigation.navigate('detail', {
            itemId: data.id,
        });
    }
    const quickEdit = ()=>{

    }
    const tracking = ()=>{

    }
    const gotoQR = ()=>{
        // @ts-ignore
        navigation.navigate('qrcode')
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
    return(
        <View style={styles.container}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.fontBold}>Đơn hàng:</Text>
                <Text style={styles.fontBold}>{data.orderCode}</Text>
                <FontAwesome5 style={{...styles.fontBold,marginLeft:10}} name={'clone'}/>
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text style={{color:"#0b21e5",fontWeight:"bold"}}>{getDateTime(data.createDate)}</Text>
                <Text onPress={gotoDetail}
                      style={{...getColor(data.status),padding:5,borderRadius:10,fontWeight:"bold"}}>{getStatusName(data.status)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col40}>Khách hàng:</Text>
                <Text style={styles.col60}>{data.fullName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col40}>Tiền hàng:</Text>
                <Text style={{...styles.col40}}>
                    <NumberFormat value={data.productAmount}
                                  thousandSeparator={true}
                                  displayType={'text'}
                                  renderText={(text)=> <Text>{text}</Text>}
                                  suffix={' đ'} />
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col40}>Phí vận chuyển:</Text>
                <Text style={{...styles.col40}}>
                    <NumberFormat value={data.ship}
                                  thousandSeparator={true}
                                  displayType={'text'}
                                  renderText={(text)=> <Text>{text}</Text>}
                                  suffix={' đ'} />
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col40}>Giá vốn:</Text>
                <Text style={{...styles.col40}}>
                    <NumberFormat value={data.cost}
                                  thousandSeparator={true}
                                  displayType={'text'}
                                  renderText={(text)=> <Text>{text}</Text>}
                                  suffix={' đ'} />
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col40}>Chi phí khác:</Text>
                <Text style={{...styles.col40}}>
                    <NumberFormat value={data.incurredCost}
                                  thousandSeparator={true}
                                  displayType={'text'}
                                  renderText={(text)=> <Text>{text}</Text>}
                                  suffix={' đ'} />
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col40}>Đã thanh toán:</Text>
                <Text style={{...styles.col40}}>
                    <NumberFormat value={data.paid}
                                  thousandSeparator={true}
                                  displayType={'text'}
                                  renderText={(text)=> <Text>{text}</Text>}
                                  suffix={' đ'} />
                </Text>
            </View>
            <View>
                <Text style={{fontWeight:"bold"}}>Địa chỉ:{data.fullAddress}</Text>
            </View>
            <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",flexWrap: "wrap",borderTopWidth:1,borderTopColor:"#e92020",marginTop:10,paddingTop:5}}>

                <Text style={{color:"#f34f06",fontWeight:"bold",marginTop:5}}>
                    <Text>Tổng hóa đơn:</Text>
                    <NumberFormat value={data.orderAmount}
                                  thousandSeparator={true}
                                  displayType={'text'}
                                  renderText={(text)=> <Text>{text}</Text>}
                                  suffix={' đ'} />
                </Text>
                <Text style={{color:"#f34f06",fontWeight:"bold",marginTop:5}}>
                    <Text>COD:</Text>
                    <NumberFormat value={data.cod}
                                  thousandSeparator={true}
                                  displayType={'text'}
                                  renderText={(text)=> <Text>{text}</Text>}
                                  suffix={' đ'} />
                </Text>
                <Text style={{color:"#f34f06",fontWeight:"bold",marginTop:5}}>
                    <Text>Lợi nhuận:</Text>
                    <NumberFormat value={data.profit}
                                  thousandSeparator={true}
                                  displayType={'text'}
                                  renderText={(text)=> <Text>{text}</Text>}
                                  suffix={' đ'} />
                </Text>
                <Text style={{color:"#f34f06",fontWeight:"bold",marginTop:5}}>
                    <Text>Tỉ suất:</Text>
                    <NumberFormat value={Math.round((data.profitMargin*100))}
                                  thousandSeparator={true}
                                  displayType={'text'}
                                  renderText={(text)=> <Text>{text}</Text>}
                                  suffix={'%'} />
                </Text>
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
