import {FlatList, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import TrackingOrderItem from "./components/TrackingOrderItem";
import {findAllTrackingOrder} from "../../services/OrderService";
import {useRoute} from "@react-navigation/native";
const TrackingOrderScreen = ()=>{
    const route = useRoute();
    const [list,setList] = useState([]);
    useEffect(()=>{
        const params:any = route.params;
        if (params.id){
            findAllTrackingOrder(params.id).then((results)=>{
               setList(results);
            })
        }
    },[])
    return(
        <View style={{padding:10}}>
            <FlatList data={list}
                      ItemSeparatorComponent={() => <View style={{height: 5}}/>}
                      renderItem={({item})=><TrackingOrderItem data={item}/>}/>
        </View>
    )
}
export default TrackingOrderScreen;
