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
            {label: "H??m nay", value: "today"},
            {label: "H??m qua", value: "yesterday"},
            {label: "Th??ng n??y", value: "currentMonth"},
            {label: "7 ng??y tr?????c", value: "7daysago"},
            {label: "30 ng??y tr?????c", value: "30daysago"},
            {label: "90 ng??y tr?????c", value: "90daysago"},
            {label: "N??m tr?????c", value: "earlyyear"},
            {label: "Qu?? 1", value: "q1"},
            {label: "Qu?? 2", value: "q2"},
            {label: "Qu?? 3", value: "q3"},
            {label: "Qu?? 4", value: "q4"},
            {label: "Th??ng 1", value: "month1"},
            {label: "Th??ng 2", value: "month2"},
            {label: "Th??ng 3", value: "month3"},
            {label: "Th??ng 4", value: "month4"},
            {label: "Th??ng 5", value: "month5"},
            {label: "Th??ng 6", value: "month6"},
            {label: "Th??ng 7", value: "month7"},
            {label: "Th??ng 8", value: "month8"},
            {label: "Th??ng 9", value: "month9"},
            {label: "Th??ng 10", value: "month10"},
            {label: "Th??ng 11", value: "month11"},
            {label: "Th??ng 12", value: "month12"},
        ]
    }
    const statusOptions = ()=>{
        return [
            {label: "T???t c???", value: ""},
            {label: "???? ho??n th??nh", value: "success"},
            {label: "Ch??? thanh to??n", value: "pendding"},
            {label: "H???y ????n h??ng", value: "cancel"},
            {label: "??ang x??? l??", value: "processing"},
            {label: "Th???t b???i", value: "failed"},
            {label: "??ang v???n chuy???n", value: "shipping"},
            {label: "Ch??? Ph??t B??? Sung", value: "awaitingadditionaldelivery"},
            {label: "???? thanh m???t ph???m", value: "partiallypaid"},
            {label: "???? thanh to??n", value: "paid"},
            {label: "???? ho??n l???i ti???n", value: "refunded"},
        ]
    }
    return(
        <View style={{backgroundColor:"#fff",borderRadius:10,overflow:"hidden",paddingTop:10,paddingBottom:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:"bold"}}>Tr???ng th??i</Text>
                    <Picker onValueChange={(value, index)=>setStatus(value)}
                            style={{viewContainer:{paddingTop:10,paddingBottom:10}}}
                            value={status} items={statusOptions()}/>
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:"bold"}}>Th???i gian</Text>
                    <Picker onValueChange={(value, index)=>setOption(value)}
                            style={{viewContainer:{paddingTop:10,paddingBottom:10}}}
                            value={option} items={options()}/>
                </View>
                <View style={{flex:1}}>
                    <Text>Web</Text>
                    <Picker onValueChange={(value, index)=>setHost(value)}
                            style={{viewContainer:{paddingTop:10,paddingBottom:10}}}
                            value={host} items={partner}/>
                </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
                <View style={{width:"50%"}}>
                    <View style={{...styles.row,justifyContent:"space-between",alignItems:"center",paddingRight:10}}>
                        <Text style={{...styles.column}}>T???ng doanh thu</Text>
                        <Text style={{...styles.column}}>:</Text>
                    </View>
                    <View style={{...styles.row,justifyContent:"space-between",alignItems:"center",paddingRight:10}}>
                        <Text style={{...styles.column}}>L???i nhu???n</Text>
                        <Text style={{...styles.column}}>:</Text>
                    </View>
                    <View style={{...styles.row,justifyContent:"space-between",alignItems:"center",paddingRight:10}}>
                        <Text style={{...styles.column}}>Ph?? ship</Text>
                        <Text style={{...styles.column}}>:</Text>
                    </View>
                    <View style={{...styles.row,justifyContent:"space-between",alignItems:"center",paddingRight:10}}>
                        <Text style={{...styles.column}}>Ph??t sinh</Text>
                        <Text style={{...styles.column}}>:</Text>
                    </View>
                </View>
                <View style={{width:"50%"}}>
                    <Text style={{...styles.row,...styles.column,...styles.colorRed}}><CurrencyFormat value={data.netRevenue?data.netRevenue:'0'} surfix={'??'}/> </Text>
                    <Text style={{...styles.row,...styles.column,...styles.colorRed}}><CurrencyFormat value={data.profit?data.profit:'0'} surfix={'??'}/></Text>
                    <Text style={{...styles.row,...styles.column,...styles.colorRed}}><CurrencyFormat value={data.ship?data.ship:'0'} surfix={'??'}/></Text>
                    <Text style={{...styles.row,...styles.column,...styles.colorRed}}><CurrencyFormat value={data.incurredCost?data.incurredCost:'0'} surfix={'??'}/></Text>
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
