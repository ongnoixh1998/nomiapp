import {FlatList, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import TrackingOrderItem from "./components/TrackingOrderItem";
import {findAllTrackingOrder} from "../../services/OrderService";
import {useRoute} from "@react-navigation/native";
import NumberPickerDialog from "../../components/NumberPickerDialog";
const TrackingOrderScreen = ()=>{
    const route = useRoute();
    const params:any = route.params;
    const [list,setList] = useState([]);

    useEffect(()=>{

        if (params.id){
            findAllTrackingOrder(params.id).then((results)=>{
               setList(results);
            })
        }
    },[]);
    const onChangeValue = useCallback((value)=>{
        findAllTrackingOrder(params.id).then((results)=>{
            setList(results);
        })
    },[])
    return(
        <View style={{padding:10}}>
            <FlatList data={list}
                      ItemSeparatorComponent={() => <View style={{height: 5}}/>}
                      renderItem={({item})=><TrackingOrderItem data={item} onChangeValue={onChangeValue}/>}/>

        </View>
    )
}
export default TrackingOrderScreen;
