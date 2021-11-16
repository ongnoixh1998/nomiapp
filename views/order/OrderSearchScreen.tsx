import {StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import RNPickerSelect from "react-native-picker-select";
import {Button, Stack} from "native-base";
import {FILTERS_ORDER} from "../../services/OrderService";
import {findAll} from "../../services/PartnerService";
import {useDispatchEvent} from "../../hook/useEventListener";
import {CALLBACK_SEARCH_ORDER_SCREEN} from "../../constants/EVENT_CONSTANTS";
import {useNavigation} from "@react-navigation/native";
const OrderSearchScreen = ()=>{
    const navigation = useNavigation()
    const [filter,setFilter] = useState('');
    const [host,setHost] = useState('');
    const [keyword,setKeyword] = useState('');
    const [hosts,setHosts] = useState([])
    useEffect(()=>{
       findAll().then((results)=>{
           setHosts(results);
       })
    },[])
    const handleSelectFilter = (value:any)=>{
        setFilter(value);
    }
    const getValueSelectFilter = (filterValue:string)=>{
        const filter = FILTERS_ORDER.filter((item:any)=>item.value===filterValue);
        return filter[0]
    }
    const handleSelecthost = (value:any)=>{
        setHost(value)
    }
    const getValueSelectHost:any = (hostValue:any)=>{
        return hosts.filter((item:any)=>item.value===hostValue)[0];
    }
    const submit = ()=>{
        navigation.goBack();
        useDispatchEvent(CALLBACK_SEARCH_ORDER_SCREEN,{
            filterValue:filter,
            hostValue:host,
            keywordValue:keyword
        })
    }
    return(
        <Stack style={{...styles.container}} space={'3'}>
            <View style={{...styles.itemFilter}}>
                <Text style={{fontWeight:"bold"}}>Tùy chọn lọc</Text>
                <RNPickerSelect
                    style={{viewContainer:styles.selectPicker}}
                    useNativeAndroidPickerStyle={true}
                    value={getValueSelectFilter(filter)?getValueSelectFilter(filter).value:''}
                    onValueChange={handleSelectFilter}
                    items={FILTERS_ORDER}/>
            </View>
            <View style={{...styles.itemFilter}}>
                <Text style={{fontWeight:"bold"}}>Trang web</Text>
                <RNPickerSelect
                    style={{viewContainer:styles.selectPicker}}
                    useNativeAndroidPickerStyle={true}
                    value={getValueSelectHost(host)?getValueSelectHost(host).value:''}
                    onValueChange={handleSelecthost}
                    items={hosts}/>
            </View>
            <View style={{...styles.itemFilter}}>
                <Text style={{fontWeight:"bold"}}>Từ khóa tìm kiếm</Text>
                <TextInput
                    value={keyword}
                    onChangeText={(text => setKeyword(text))}
                    placeholder={"Từ khóa tìm kiếm"}/>
            </View>
            <View>
                <Button onPress={submit}>Tìm kiếm</Button>
            </View>
        </Stack>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:10
    },
    itemFilter:{
        padding:10,
        borderRadius:10,
        backgroundColor:"#fff"
    },
    selectPicker:{
        backgroundColor:"#fff",
        marginTop:5,
        borderRadius:5
    }
})
export default OrderSearchScreen;
