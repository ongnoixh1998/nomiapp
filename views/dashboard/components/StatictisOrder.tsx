import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";

import Picker from "react-native-picker-select";
import CurrencyFormat from "../../../components/CurrencyFormat";
import {statictisArea} from "../../../services/OrderService";
import {findAll} from "../../../services/PartnerService";


const StatictisOrder = ()=>{
    const [host,setHost] = useState('');
    const [status,setStatus] = useState('');
    const [year,setYear] = useState('');
    const [option,setOption] = useState('');
    const [list,setList] = useState([]);
    const [partner,setPartner] = useState([]);
    const [data,setData] = useState<any>({})

    useEffect(()=>{
        findAll().then(results=>setPartner(results));
        statictisArea({host:'',status:'',year:'',option:''}).then((results)=>{
            setList(results)
            const dataReceived = results.data.reduce((prevData:any,nextData:any)=>{
                return {
                    cost:prevData.cost+nextData.cost,
                    grossRevenue:prevData.grossRevenue+nextData.grossRevenue,
                    incurredCost:prevData.incurredCost+nextData.incurredCost,
                    netRevenue:prevData.netRevenue+nextData.netRevenue,
                    profit:prevData.profit+nextData.profit,
                    profitPercent:prevData.profitPercent+nextData.profitPercent,
                    ship:prevData.ship+nextData.ship,
                }
            },{cost:0,grossRevenue:0,incurredCost:0,netRevenue:0,profit:0,profitPercent:0,ship:0});
            setData(dataReceived);
            console.log(dataReceived);
        })
    },[])
    useEffect(()=>{
        console.log("running")
        statictisArea({host:host,status:status,year:year,option:option}).then((results)=>{
            setList(results)
            const dataReceived = results.data.reduce((prevData:any,nextData:any)=>{
                return {
                    cost:prevData.cost+nextData.cost,
                    grossRevenue:prevData.grossRevenue+nextData.grossRevenue,
                    incurredCost:prevData.incurredCost+nextData.incurredCost,
                    netRevenue:prevData.netRevenue+nextData.netRevenue,
                    profit:prevData.profit+nextData.profit,
                    profitPercent:prevData.profitPercent+nextData.profitPercent,
                    ship:prevData.ship+nextData.ship,
                }
            },{cost:0,grossRevenue:0,incurredCost:0,netRevenue:0,profit:0,profitPercent:0,ship:0});
            setData(dataReceived);
        })
    },[host,status,year,option])
    const onChangeValueStatus = ()=>{

    }
    const onChangeValueDateTime = ()=>{

    }
    const onChangeValueHost = ()=>{

    }
   const options = ()=> {
        return [
            {label: "Hôm nay", value: "today"},
            {label: "Hôm qua", value: "yesterday"},
            {label: "Tháng này", value: "currentMonth"},
            {label: "7 ngày trước", value: "7daysago"},
            {label: "30 ngày trước", value: "30daysago"},
            {label: "90 ngày trước", value: "90daysago"},
            {label: "Năm trước", value: "earlyyear"},
            {label: "Quý 1", value: "q1"},
            {label: "Quý 2", value: "q2"},
            {label: "Quý 3", value: "q3"},
            {label: "Quý 4", value: "q4"},
            {label: "Tháng 1", value: "month1"},
            {label: "Tháng 2", value: "month2"},
            {label: "Tháng 3", value: "month3"},
            {label: "Tháng 4", value: "month4"},
            {label: "Tháng 5", value: "month5"},
            {label: "Tháng 6", value: "month6"},
            {label: "Tháng 7", value: "month7"},
            {label: "Tháng 8", value: "month8"},
            {label: "Tháng 9", value: "month9"},
            {label: "Tháng 10", value: "month10"},
            {label: "Tháng 11", value: "month11"},
            {label: "Tháng 12", value: "month12"},
        ]
    }
    const statusOptions = ()=>{
        return [
            {label: "Tất cả", value: ""},
            {label: "Đã hoàn thành", value: "success"},
            {label: "Chờ thanh toán", value: "pendding"},
            {label: "Hủy đơn hàng", value: "cancel"},
            {label: "Đang xử lý", value: "processing"},
            {label: "Thất bại", value: "failed"},
            {label: "Đang vận chuyển", value: "shipping"},
            {label: "Chờ Phát Bổ Sung", value: "awaitingadditionaldelivery"},
            {label: "Đã thanh một phầm", value: "partiallypaid"},
            {label: "Đã thanh toán", value: "paid"},
            {label: "Đã hoàn lại tiền", value: "refunded"},
        ]
    }
    return(
        <View style={{backgroundColor:"#fff",borderRadius:10,overflow:"hidden",paddingTop:10,paddingBottom:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",}}>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:"bold",paddingLeft:10}}>Trạng thái</Text>
                    <Picker onValueChange={(value, index)=>setStatus(value)} value={status} items={statusOptions()}/>
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:"bold",paddingLeft:10}}>Thời gian</Text>
                    <Picker onValueChange={(value, index)=>setOption(value)} value={option} items={options()}/>
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:"bold",paddingLeft:10}}>Web</Text>
                    <Picker onValueChange={(value, index)=>setHost(value)} value={host} items={partner}/>
                </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
                <View style={{width:"50%"}}>
                    <View style={{...styles.row,justifyContent:"space-between",alignItems:"center",paddingRight:10}}>
                        <Text style={{...styles.column}}>Tổng doanh thu</Text>
                        <Text style={{...styles.column}}>:</Text>
                    </View>
                    <View style={{...styles.row,justifyContent:"space-between",alignItems:"center",paddingRight:10}}>
                        <Text style={{...styles.column}}>Lợi nhuận</Text>
                        <Text style={{...styles.column}}>:</Text>
                    </View>
                    <View style={{...styles.row,justifyContent:"space-between",alignItems:"center",paddingRight:10}}>
                        <Text style={{...styles.column}}>Phí ship</Text>
                        <Text style={{...styles.column}}>:</Text>
                    </View>
                    <View style={{...styles.row,justifyContent:"space-between",alignItems:"center",paddingRight:10}}>
                        <Text style={{...styles.column}}>Phát sinh</Text>
                        <Text style={{...styles.column}}>:</Text>
                    </View>
                </View>
                <View style={{width:"50%"}}>
                    <Text style={{...styles.row,...styles.column,...styles.colorRed}}><CurrencyFormat value={data.netRevenue?data.netRevenue:'0'} surfix={'đ'}/> </Text>
                    <Text style={{...styles.row,...styles.column,...styles.colorRed}}><CurrencyFormat value={data.profit?data.profit:'0'} surfix={'đ'}/></Text>
                    <Text style={{...styles.row,...styles.column,...styles.colorRed}}><CurrencyFormat value={data.ship?data.ship:'0'} surfix={'đ'}/></Text>
                    <Text style={{...styles.row,...styles.column,...styles.colorRed}}><CurrencyFormat value={data.incurredCost?data.incurredCost:'0'} surfix={'đ'}/></Text>
                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    row:{
        flexDirection:"row",
        marginBottom:10,
        marginTop:10
    },
    column:{
        fontWeight:"bold"
    },
    colorRed:{
        color:"#ff0000"
    }
})
export default StatictisOrder
