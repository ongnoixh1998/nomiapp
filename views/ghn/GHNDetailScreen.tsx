import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Button, Center, CheckIcon, FormControl, Heading, Input, Select, Stack, HStack, useToast} from "native-base";
import {useRoute} from "@react-navigation/native";
import {createAndUpdate, findByOrder, getFee, getServices, paymentTypeOptions} from "../../services/GHNService";
import {getDictricts, getWards} from "../../services/AddressService";
import RNPickerSelect from "react-native-picker-select";
import LoadingScreen from "../loading/LoadingScreen";
import NumberFormat from "react-number-format";
interface GHNAccountType {
    tokenDefault:string,
    tokens:[],
}
const GHNDetailScreen = ()=>{
    /* hooks */
    const route = useRoute();
    const toast = useToast()
    /** state */
    let [account, setAccount] = React.useState("");
    const [data,setData] = useState<any>({});
    const [setting,setSetting]= useState<GHNAccountType>()
    const [provinces,setProvinces] = useState([]);
    const [dictricts,setDictricts] = useState([]);
    const [wards,setWards] = useState([])
    const [services,setServices] = useState<any>([]);
    const [loading,setLoading] = useState(true);
    const [time,setTime] = useState<any>()
    const [insurance_fee,setInsurance_fee] = useState(0);
    const [fee,setFee] = useState(0);
    useEffect(()=>{
        const params:any = route.params;
        findByOrder(params.id?{orderId:params.id}:{ghnOrder:params.ghnOrder}).then((results)=>{
            setSetting(results.setting)
            setData(results.data);
            setAccount(results.token)
            setProvinces(results.provinces);
            setDictricts(results.dictricts);
            setWards(results.wards)
            setServices(results.services);
            handleGetFee(results.token,results.data,results.services);
            setLoading(false);
            setFee(results.data.fee ? results.data.fee : 0)
            setInsurance_fee( results.data.insurance_fee ? results.data.insurance_fee : 0);

        })

    },[])
    const onChangeInput = (field:string,value:any ) =>{

        let updated:any = {}
        switch (field) {
            case "to_name":setData({...data,to_name: value});break
            case "to_phone":setData({...data,to_phone: value});break
            case "to_address":setData({...data,to_address: value});break
            case "weight":
                updated ={...data,weight: value}
                setData(updated);
                handleGetFee(account,updated,services);
                break
            case "length":
                updated ={...data,length: value}
                setData(updated);
                handleGetFee(account,updated,services);
                break
            case "width":
                updated ={...data,width: value}
                setData(updated);
                handleGetFee(account,updated,services);
                break
            case "height":
                updated ={...data,height: value}
                setData(updated);
                handleGetFee(account,updated,services);
                break
            case "cod_amount":setData({...data,cod_amount: value});break
            case "insurance_value":setData({...data,insurance_value: value});updateInsurance(value);break
            case "client_order_code":setData({...data,client_order_code: value});break
            case "note":setData({...data,note: value});break
            case "required_note":setData({...data,required_note: value});break
            case "to_province":setData({...data,to_province: value});break
            case "to_district_id":setData({...data,to_district_id: value});break
            case "to_ward_code":setData({...data,to_ward_code: value});break
            case "payment_type_id":setData({...data,payment_type_id: value});break

        }


    }
    const onChangeInputItem = (index:number, value:any, field:any)=> {
        if (data.items){
            const updated = data.items.map((item:any, indexData:number) => {
                if (index === indexData) {
                    switch (field) {
                        case "name":
                            item.name = value;
                            break;
                        case "code":
                            item.code = value;
                            break;
                        case "quantity":
                            item.quantity = value;
                            break;
                    }
                }
                return item;
            });
            setData({...data,items:updated});
        }

    }
    const handleGetServices = (to_dictrict:string)=>{
        data.to_district_id = to_dictrict
        getServices(account,to_dictrict).then((results)=>{
                handleGetFee(account,data,results.data)
        })
    }
    const handleGetFee = (token:string,params:any,servicesData:any)=> {
        if (time) {
            clearTimeout(time)
        }
        setTime(setTimeout(()=>{
            const {to_ward_code, to_district_id, weight, length, width, height} = params;
            servicesData.forEach((item:any)=>{
                getFee(token,{
                    to_district_id: to_district_id,
                    to_ward_code: to_ward_code,
                    height: height,
                    length: length,
                    weight: weight,
                    width: width,
                    coupon: null,
                    service_id: item.service_id,
                    service_type_id: item.service_type_id
                }).then((results)=>{

                    const updated = servicesData.map((service:any) => {
                        if (item.service_id === service.service_id) {
                            service.fee = results.data
                        }
                        return service;
                    });
                    setServices(updated)
                })
            })
        },200))

    }
    const handleSelectProvice = (value:any)=>{
        onChangeInput("to_province",value)
        getDictricts(value).then((results)=>{
            setDictricts(results);
        })
    }
    const handleSelectDictrict = (value:any)=>{
        onChangeInput("to_district_id",value)
        handleGetServices(value);
        getWards(value).then((results)=>{
            setWards(results)
        })
    }
    const handleSelectWard = (value:string)=>{
        onChangeInput("to_ward_code",value)
    }
    const getValueProvince = (value:string)=>{
        const filter:any = provinces.filter((item:any)=>value==item.value);
        if (filter.length>0){
            return filter[0].value
        }
        return null;
    }
    const getValueDictrict = (value:string)=>{
        const filter:any  = dictricts.filter((item:any)=>value==item.value);
        if (filter.length>0){
            return filter[0].value
        }
        return null;
    }
    const getValueWard = (value:string)=>{
        const filter:any  = wards.filter((item:any)=>value==item.value);
        if (filter.length>0){
            return filter[0].value
        }
        return null;
    }
    const getActiveService = (id:number)=>{
        const service_id = data.service_id;
         if (service_id===id){
             return {
                 borderColor:"#fa3300"
             }
         }else {
             return {
                 borderColor:"#000"
             }
         }

    }
    const updateInsurance = (value:number)=>{
        let insurance_fee = 0;
        if (value > 3000000) {
            insurance_fee = ((value * 0.5) / 100)
        }
        setInsurance_fee(insurance_fee);

    }
    const handleSelectService = (service:any)=>{
        if (service.fee){
            setFee(service.fee.total);
        }
        updateInsurance(data.insurance_value)
        setData({...data,service_id: service.service_id, service_type_id: service.service_type_id})

    }
    const handleSubmit = ()=>{
        createAndUpdate(account,data).then((results)=>{
            if (!results.data.code){
                toast.show({
                    title: "Thông báo",
                    status: "error",
                    description: results.data.message,
                    placement:'top',

                })
            }else {
                toast.show({
                    title: "Thông báo",
                    status: "success",
                    description: results.data.message,
                    placement:'top',

                })
            }
        })

    }
    if (loading) return <LoadingScreen/>
    return(
        <View style={{flex:1}}>
            <ScrollView>
                <Stack style={{padding:10}} space={'3'}>
                    <View style={{borderRadius:10,backgroundColor:"#fff",paddingBottom:10}}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} space={'1'} backgroundColor={'white'} borderRadius={"md"}>
                            <View style={{display:"flex",flexDirection:"row"}}>
                                <View style={{width:5,backgroundColor:"#ff3604",borderRadius:10}}></View>
                                <Heading color="emerald.500">Bên gửi</Heading>
                            </View>
                        </Stack>
                        <View style={{padding:10}}>
                            {
                                setting?.tokens?
                                    <FormControl >
                                        <FormControl.Label _text={{bold: true}}>Tải khoản</FormControl.Label>
                                        <Select
                                            selectedValue={account}
                                            minWidth="200"
                                            placeholder="Tải khoản"
                                            mt={1}
                                            onValueChange={(itemValue) => setAccount(itemValue)}>
                                            {setting.tokens.map((item:any,index:number)=>{
                                                return(
                                                    <Select.Item key={index} label={item.name} value={item.token} />
                                                )
                                            })}


                                        </Select>
                                    </FormControl>:
                                    <Text>Chưa có tài khoản</Text>
                            }

                            <FormControl >
                                <FormControl.Label _text={{bold: true}}>Tùy chọn thanh toán</FormControl.Label>
                                <Select
                                    selectedValue={data.payment_type_id}
                                    minWidth="200"
                                    placeholder="Tùy chọn thanh toán"
                                    mt={1}
                                    onValueChange={(itemValue) => onChangeInput('payment_type_id',itemValue)}>
                                    {
                                        paymentTypeOptions().map((item:any,index:number)=>{
                                            return(
                                                <Select.Item key={index} label={item.label} value={item.value} />
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </View>
                    </View>
                    <View>
                        <Stack direction={'row'} alignItems={'center'} space={'1'} backgroundColor={'white'} borderRadius={"md"}>
                            <View style={{width:5,backgroundColor:"#ff3604",height:'100%',borderRadius:10}}></View>
                            <Heading color="emerald.500">Bên nhận</Heading>
                        </Stack>
                        <Stack space={'3'} backgroundColor={'white'} padding={'3'}>
                            <FormControl isRequired>
                                <FormControl.Label _text={{bold: true}}>Họ và tên</FormControl.Label>
                                <Input placeholder="Họ và tên"
                                       value={data.to_name}
                                       onChangeText={(text)=>onChangeInput('to_name',text)}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label _text={{bold: true}}>Số điện thoại</FormControl.Label>
                                <Input placeholder="Số điện thoại"
                                       value={data.to_phone}
                                       keyboardType={'numeric'}
                                       onChangeText={(text)=>onChangeInput('to_phone',text)}/>
                            </FormControl>

                            <View>
                                <Text style={{fontWeight:"bold"}}>Tỉnh/TP(*)</Text>
                                <RNPickerSelect
                                    style={{viewContainer:{backgroundColor:"#fff",marginTop:5,borderRadius:5,borderWidth:1,borderColor:"#dbdbdb"}}}
                                    useNativeAndroidPickerStyle={true}
                                    value={getValueProvince(data.to_province)}
                                    placeholder={{label:'Chọn tỉnh/TP',color:'#ef1e04'}}
                                    onValueChange={handleSelectProvice}
                                    items={provinces}/>
                            </View>
                            <View>
                                <Text style={{fontWeight:"bold"}}>Quận/Huyện(*)</Text>
                                <RNPickerSelect
                                    style={{viewContainer:{backgroundColor:"#fff",marginTop:5,borderRadius:5,borderWidth:1,borderColor:"#dbdbdb"}}}
                                    placeholder={{label:'Chọn quận/Huyện',color:'#ef1e04'}}
                                    value={getValueDictrict(data.to_district_id)}
                                    onValueChange={handleSelectDictrict}
                                    items={dictricts}/>
                            </View>
                            <View>
                                <Text style={{fontWeight:"bold"}}>Xã/Phường(*)</Text>
                                <RNPickerSelect
                                    style={{viewContainer:{backgroundColor:"#fff",marginTop:5,borderRadius:5,borderWidth:1,borderColor:"#dbdbdb"}}}
                                    placeholder={{label:'Chọn xã/phường',color:'#ef1e04'}}
                                    value={getValueWard(data.to_ward_code)}
                                    onValueChange={handleSelectWard}
                                    items={wards}/>
                            </View>


                            <FormControl isRequired>
                                <FormControl.Label _text={{bold: true}}>Địa chỉ</FormControl.Label>
                                <Input placeholder="Địa chỉ"
                                       value={data.to_address}
                                       onChangeText={(text)=>onChangeInput('to_address',text)}/>
                            </FormControl>
                        </Stack>
                    </View>
                    <View style={{backgroundColor:"#fff",borderRadius:10,paddingBottom:10}}>
                        <Stack direction={'row'} alignItems={'center'} space={'1'} backgroundColor={'white'} borderRadius={"md"}>
                            <View style={{width:5,backgroundColor:"#ff3604",height:'100%',borderRadius:10}}></View>
                            <Heading color="emerald.500">Hàng hóa - sản phẩm</Heading>

                        </Stack>
                        <View style={{padding:10}}>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Tên sản phẩm</FormControl.Label>
                                <Input placeholder="Tên sản phẩm"
                                       onChangeText={(text)=>onChangeInputItem(0,text,'name')}
                                       value={data.items && data.items[0].name?data.items[0].name:''}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Mã sản phẩm</FormControl.Label>
                                <Input placeholder="Mã sản phẩm"
                                       onChangeText={(text)=>onChangeInputItem(0,text,'code')}
                                       value={data.items && data.items[0].code?data.items[0].code:''}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Số lượng</FormControl.Label>
                                <Input placeholder="Số lượng"
                                       keyboardType={'numeric'}
                                       onChangeText={(text)=>onChangeInputItem(0,text,'quantity')}
                                       value={data.items && data.items[0].quantity?data.items[0].quantity.toString():'0'}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Tổng khối lượng</FormControl.Label>
                                <Input placeholder="Tổng khối lượng(g)"
                                       keyboardType={'numeric'}
                                       value={data.weight?data.weight.toString():'0'}
                                       onChangeText={(text)=>onChangeInput('weight',text)}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Tổng tiền thu hộ</FormControl.Label>
                                <Input placeholder="Tổng tiền thu hộ"
                                       keyboardType={'numeric'}
                                       value={data.cod_amount?data.cod_amount.toString():'0'}
                                       onChangeText={(text)=>onChangeInput('cod_amount',text)}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Giá trị hàng hóa</FormControl.Label>
                                <Input placeholder="Giá trị hàng hóa"
                                       keyboardType={'numeric'}
                                       value={data.insurance_value?data.insurance_value.toString():'0'}
                                       onChangeText={(text)=>onChangeInput('insurance_value',text)}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Chiều dài</FormControl.Label>
                                <Input placeholder="Chiều dài"
                                       keyboardType={'numeric'}
                                       value={data.width?data.width.toString():'0'}
                                       onChangeText={(text)=>onChangeInput('width',text)}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Chiều rộng</FormControl.Label>
                                <Input placeholder="Chiều rộng"
                                       keyboardType={'numeric'}
                                       value={data.length?data.length.toString():'0'}
                                       onChangeText={(text)=>onChangeInput('length',text)}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Chiều cao</FormControl.Label>
                                <Input placeholder="Chiều cao"
                                       keyboardType={'numeric'}
                                       value={data.height?data.height.toString():'0'}
                                       onChangeText={(text)=>onChangeInput('height',text)}/>
                            </FormControl>
                        </View>
                    </View>
                    <View>
                        <Stack direction={'row'} alignItems={'center'} space={'1'} backgroundColor={'white'} borderRadius={"md"}>
                            <View style={{width:5,backgroundColor:"#ff3604",height:'100%',borderRadius:10}}></View>
                            <Heading color="emerald.500">Gói cước - cho khối lượng</Heading>
                        </Stack>
                        <View style={{backgroundColor:"#fff"}}>
                            <HStack space={2} alignItems="center">
                                {services && services.map((item:any,index:number)=>{
                                    return(
                                        <TouchableOpacity key={index} style={{flex:1}} onPress={()=>handleSelectService(item)}>
                                            <View style={{...getActiveService(item.service_id),padding:10,margin:5,backgroundColor:"#ffffff",borderRadius:10,flex:1,borderWidth:1,display:"flex",alignItems:"center"}}>
                                                <Text style={{fontSize:15,fontWeight:"bold"}}>{item.short_name}</Text>
                                                <NumberFormat value={item.fee?item.fee.total:0}
                                                              displayType={'text'}
                                                              thousandSeparator={true}
                                                              suffix={' đ'}
                                                              renderText={(text)=> <Text style={{fontSize:20,fontWeight:"bold",color:"#ff3b00"}}>{text}</Text>}/>

                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}

                            </HStack>
                        </View>
                    </View>

                    <View style={{backgroundColor:"#fff",borderRadius:10,paddingBottom:10}}>
                        <Stack direction={'row'} alignItems={'center'} space={'1'} backgroundColor={'white'} borderRadius={"md"}>
                            <View style={{width:5,backgroundColor:"#ff3604",height:'100%',borderRadius:10}}></View>
                            <Heading color="emerald.500">Lưu ý - Ghi chú</Heading>
                        </Stack>
                        <View style={{padding:10}}>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Lưu ý giao hàng</FormControl.Label>
                                <Input placeholder="Lưu ý giao hàng"
                                       value={data.note}
                                       onChangeText={(text)=>onChangeInput('note',text)}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Mã đơn hàng</FormControl.Label>
                                <Input placeholder="Mã đơn hàng"
                                       value={data.client_order_code}
                                       onChangeText={(text)=>onChangeInput('client_order_code',text)}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{bold: true}}>Ghi chú đơn hàng</FormControl.Label>
                                <Input placeholder="Ghi chú đơn hàng"
                                       value={data.note}
                                       onChangeText={(text)=>onChangeInput('note',text)}/>
                            </FormControl>
                        </View>
                    </View>
                </Stack>
            </ScrollView>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",backgroundColor:"#fff",padding:10}}>
                <View>
                    <Text style={{fontSize:10}}>Thêm 0.5% phí bảo hiểm:
                        <NumberFormat value={insurance_fee?insurance_fee:0}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      suffix={' đ'}
                                      renderText={(text)=><Text style={{color:"#ff5900"}}>{text}</Text>}/>

                    </Text>

                    <Text style={{fontWeight:"bold",fontSize:20,color:"#ff5900"}}>
                        <NumberFormat value={fee+insurance_fee}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      suffix={' đ'}
                                      renderText={(text)=><Text>{text}</Text>}/>
                    </Text>
                </View>
                <Button onPress={handleSubmit}>Cập nhật</Button>
            </View>
        </View>

    )
}
export default GHNDetailScreen;
