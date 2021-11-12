import {View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {FlatList} from "native-base";
import OrderQRScannedItem from "./components/OrderQRScannedItem";
import {qrScan} from "../../services/OrderService";
import {useNavigation, useRoute} from "@react-navigation/native";

const QRScannedScreen = () => {

    const route = useRoute();
    const [list, setList] = useState<any>([])

    useEffect(() => {
        const params: any = route.params;
        if (params.id) {
            qrScan(params.id).then((results) => {
                setList(results.data);
                console.log(results);
            })
        }
    }, [])
    const onChangeValue = useCallback((field, value, id,packageReceived) => {
        setList((prevList:any)=>{
            const updated = prevList.map((item:any) => {
                const trackId = item.trackingId;

                if (trackId === id) {
                    switch (field) {
                        case "viStatusCode":
                            item.viStatusCode = value;
                            item.packageReceived = packageReceived;
                            break;
                    }
                }
                return item;
            });

            return updated
        });

    }, [])
    return (
        <View style={{padding: 10,flex:1}}>
            <FlatList data={list}
                      ItemSeparatorComponent={() => <View style={{height: 5}}/>}
                      keyExtractor={(item:any, index) => item.trackingId }
                      renderItem={({item,index}) => <OrderQRScannedItem key={index}
                                                                  onChangeValue={onChangeValue}
                                                                  data={item}/>}/>
        </View>
    )
}
export default QRScannedScreen;
