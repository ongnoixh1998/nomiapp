import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import RNPickerSelect from 'react-native-picker-select';
import {getDictricts, getProvices, getWards} from "../../services/AddressService";
import {Button, Input, Stack} from "native-base";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useDispatchEvent} from "../../hook/useEventListener";
import {CALLBACK_ADDRESS_SCREEN} from "../../constants/EVENT_CONSTANTS";
interface SelectTyple {
    label:string,
    value:string
}
const OrderAddressScreen = ()=>{
    const route = useRoute();
    const params:any = route.params;
    const navigation = useNavigation();
    /** state */
    const [fullname,setFullname] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('')
    const [address,setAddress] = useState('')
    const [province,setProvince] = useState('');
    const [dictrict,setDictrict] = useState('');
    const [ward,setWard] = useState('');

    /** */
    const [provinces,setProvinces] = useState([]);
    const [dictricts,setDictricts] = useState([]);
    const [wards,setWards] = useState([])
    /***/
    useEffect(()=>{
        const data = params.data;
        setFullname(data.billingFullName?data.billingFullName:'');
        setPhone(data.billingPhoneNumber?data.billingPhoneNumber:'');
        setEmail(data.billingEmail?data.billingEmail:'');
        setProvince(data.billingCity?data.billingCity:'');
        setDictrict(data.billingDistrict?data.billingDistrict:'');
        setWard(data.billingWards?data.billingWards:'');
        setAddress(data.billingAddress?data.billingAddress:'')
        getProvices().then((results)=>{
            setProvinces(results);
        })
    },[params])
    const handleSelectProvice = (value:any)=>{
        setProvince(value)
        getDictricts(value).then((results)=>{
            setDictricts(results);
        })
    }
    const handleSelectDictrict = (value:any)=>{
        setDictrict(value)
        getWards(value).then((results)=>{
          setWards(results)
        })
    }
    const handleSelectWard = (value:string)=>{
        setWard(value)
    }
    const getValueProvince:any = (value:string)=>{
        const filter:SelectTyple[] = provinces.filter((item:any)=>value==item.value);
        if (filter.length>0){
            return filter[0]
        }
        return null;
    }
    const getValueDictrict:any = (value:string)=>{
        const filter:SelectTyple[]  = dictricts.filter((item:any)=>value==item.value);
        if (filter.length>0){
            return filter[0]
        }
        return null;
    }
    const getValueWard:any = (value:string)=>{
        const filter:SelectTyple[]  = wards.filter((item:any)=>value==item.value);
        if (filter.length>0){
            return filter[0]
        }
        return null;
    }
    const handleUpdate = ()=>{
        const proviceName = getValueProvince(province)?getValueProvince(province).label:'';
        const dictrictName = getValueDictrict(dictrict)?getValueDictrict(dictrict).label:'';
        const wardName = getValueWard(ward)?getValueWard(ward).label:'';
        const fullAddress = address +","+wardName+","+dictrictName+","+proviceName
        const dataCallback = {
            billingFullName:fullname,
            billingPhoneNumber:phone,
            billingEmail:email,
            billingCity:province,
            billingDistrict:dictrict,
            billingWards:ward,
            billingAddress:address,
            fullAddress:fullAddress
        }
        navigation.goBack();
        useDispatchEvent(CALLBACK_ADDRESS_SCREEN,dataCallback)
    }
    return(
        <View style={{padding:10}}>
            <Stack space={'3'}>
                <Input backgroundColor={'white'}
                       value={fullname}
                       onChangeText={(text)=>setFullname(text)}
                       placeholder={'Tên khách hàng'}/>
                <Input backgroundColor={'white'}
                       value={phone}
                       onChangeText={(text)=>setPhone(text)}
                       placeholder={'Số điện thoại'}/>
                <Input backgroundColor={'white'}
                       value={email}
                       onChangeText={(text)=>setEmail(text)}
                       placeholder={'Email'}/>
                <Input backgroundColor={'white'}
                       value={address}
                       onChangeText={(text)=>setAddress(text)}
                       placeholder={'Địa chỉ nhà'}/>
                <RNPickerSelect
                    style={{viewContainer:{backgroundColor:"#fff",marginTop:5,borderRadius:5}}}
                    useNativeAndroidPickerStyle={true}
                    value={getValueProvince(province)?getValueProvince(province).value:''}
                    placeholder={{label:'Chọn tỉnh/TP',color:'#ef1e04'}}
                    onValueChange={handleSelectProvice}
                    items={provinces}/>
                <RNPickerSelect
                    style={{viewContainer:{backgroundColor:"#fff",marginTop:5,borderRadius:5}}}
                    placeholder={{label:'Chọn quận/Huyện',color:'#ef1e04'}}
                    value={getValueDictrict(dictrict)?getValueDictrict(dictrict).value:''}
                    onValueChange={handleSelectDictrict}
                    items={dictricts}/>
                <RNPickerSelect
                    style={{viewContainer:{backgroundColor:"#fff",marginTop:5,borderRadius:5}}}
                    placeholder={{label:'Chọn xã/phường',color:'#ef1e04'}}
                    value={getValueWard(ward)?getValueWard(ward).value:''}
                    onValueChange={handleSelectWard}
                    items={wards}/>
                    <Button onPress={handleUpdate}>Cập nhật</Button>
            </Stack>

        </View>
    )
}
export default OrderAddressScreen;
