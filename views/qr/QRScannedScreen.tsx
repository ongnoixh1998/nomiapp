import {View,Text} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {FlatList} from "native-base";
import OrderQRScannedItem from "./components/OrderQRScannedItem";
import {qrScan} from "../../services/OrderService";
import {useNavigation, useRoute} from "@react-navigation/native";
import LoadingScreen from "../loading/LoadingScreen";

const QRScannedScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [list, setList] = useState<any>([])
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const params: any = route.params;
        if (params.id) {
            navigation.setOptions({title:params.id})
            qrScan(params.id).then((results) => {
                setList(results.data);
                setLoading(false)

            })
        }
    }, [])
    const onChangeValue = useCallback((field, value, id,packageReceived) => {
        console.log(field,value);
        setList((prevList:any)=>{
            const updated = prevList.map((item:any) => {
                const trackId = item.trackingId;
                if (trackId === id) {
                    switch (field) {
                        case "viStatusCode":
                            item.viStatusCode = value;
                            item.packageReceived = packageReceived;
                            break;
                        case "countPackage":
                            item.countPackage = value;
                            break;
                    }
                }
                return item;
            });

            return updated
        });
        const params: any = route.params;
        qrScan(params.id).then((results) => {
            setList(results.data);
        })
    }, [])
    if (loading) return <LoadingScreen/>
    return (
        <View style={{padding: 10,flex:1}}>
            {
                list && list.length>0?
                    <FlatList data={list}
                              ItemSeparatorComponent={() => <View style={{height: 5}}/>}
                              keyExtractor={(item:any, index) => item.trackingId }
                              renderItem={({item,index}) => <OrderQRScannedItem key={index}
                                                                                        onChangeValue={onChangeValue}
                                                                                        data={item}/>}/>:
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontWeight:"bold"}}>Không tìm được hóa đơn</Text>
                </View>
            }

        </View>
    )
}
export default QRScannedScreen;
