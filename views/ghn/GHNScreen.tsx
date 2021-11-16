import {FlatList, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import GHNItem from "./components/GHNItem";
import {findAll} from "../../services/GHNService";
import {useNavigation, useRoute} from "@react-navigation/native";
import LoadingScreen from "../loading/LoadingScreen";
import {Button} from "native-base";
const GHNScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();
    const params:any = route.params;
    const [loading,setLoading] = useState(true);
    const [list,setList] = useState([])
    useEffect(()=>{
        console.log(params.orderId)
        findAll(params.orderId).then((results)=>{
            setList(results.data);
            setLoading(false)
        })
    },[])
    const loadAll = ()=>{
        setLoading(true);
        findAll().then((results)=>{
            setList(results.data);
            setLoading(false)
        })
    }
    const gotoCreate = ()=>{
        // @ts-ignore
        navigation.navigate("ghndetail",{
            id:params.orderId
        })
    }
    const onRemove = useCallback((order_code)=>{
        const removed = list.filter((item:any)=>item.orderCodeGhn!==order_code);
        setList(removed)
    },[])
    if (loading) return <LoadingScreen/>
    if (!loading && list.length<=0) return (
        <View style={{flex:1,justifyContent:"center",backgroundColor:"#fff",padding:10}}>
            <Text style={{fontWeight:"bold",textAlign:"center",marginBottom:10}}>Chưa có hóa đơn nào</Text>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                <Button marginRight={'3'} onPress={loadAll}>Tất cả HĐ</Button>
                {
                    params.orderId?
                        <Button onPress={gotoCreate}>Thêm</Button>:
                        <Text></Text>
                }
            </View>

        </View>
    )
    return(
        <View style={{padding:10}}>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#fff",marginBottom:10,padding:10,alignItems:"center"}}>
                <Text style={{fontWeight:"bold"}}>Số lượng HD:0</Text>
                {
                    params.orderId?
                        <Button onPress={gotoCreate}>Thêm</Button>:
                        <Text></Text>
                }

            </View>

            <FlatList data={list}
                      ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                      renderItem={({item})=><GHNItem data={item} onRemove={onRemove}/>}/>
        </View>
    )
}
export default GHNScreen;
