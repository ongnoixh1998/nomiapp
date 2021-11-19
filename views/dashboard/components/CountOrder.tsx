import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import Icon from 'react-native-vector-icons/FontAwesome5'
import {countByStatus, LISTSTATUS} from "../../../services/OrderService";
const CountOrder = ()=>{
    const [list,setList] = useState([...LISTSTATUS])
    useEffect( ()=>{
        running().then((results)=>{
            setList(results);
        })

    },[]);
    const running = async ()=>{
        const updated = [...list];
        for (let i=0;i<updated.length;i++){
            const results = await countByStatus(updated[i].status)
            updated[i].value =results.data
        }
        return updated;
    }
    const getColorByStatus = (status:string)=>{
        switch (status){
            case 'success': return{backgroundColor:"#2da502"}
            case 'pendding': return{backgroundColor:"#fcda12"}
            case 'shipping': return{backgroundColor:"#f56d00"}
            case 'processing': return{backgroundColor:"#a00cfa"}
            case 'incomplate': return{backgroundColor:"#d006ae"}
        }
    }
    return(
        <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",backgroundColor:"#fff",borderRadius:10,overflow:"hidden"}}>
            {list.map((item,index)=>{
                return(
                    <View key={index} style={{...getColorByStatus(item.status),padding:10,display:"flex",alignItems:"center",borderRadius:15,margin:5,width:'30%',overflow:"hidden"}}>
                        <Text style={{fontWeight:"bold",fontSize:10}}>{item.title}</Text>
                        <Text style={{fontWeight:"bold"}}>{item.value}</Text>
                    </View>
                )
            })}



        </View>
    )
}
export default CountOrder;
