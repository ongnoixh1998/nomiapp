import {FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import ItemDetail from "./components/ItemDetail";
import Icons from 'react-native-vector-icons/FontAwesome5'
import {createAndUpdate, DISCOUNTTYPE, findById} from "../../services/OrderService";
import Layout from "../../layouts/Layout";
import {Button, useToast} from "native-base";
import NumberFormat from "react-number-format";
import {NumberFormatInput} from "../../components/NumberFormatInput";
import Icon from 'react-native-vector-icons/FontAwesome5'
import {useAddEvent, useRemoveEvent} from "../../hook/useEventListener";
import {CALLBACK_ADDRESS_SCREEN} from "../../constants/EVENT_CONSTANTS";
const OrderDetail = ({navigation,route}:any)=>{
    const toast = useToast()
    const [loading,setLoading] = useState(true);
    const { itemId } = route.params;
    const [details,setDetails] = useState<any>([])
    const [data,setData] = useState<any>({});
    const [fullAdress,setFullAdress] = useState('')
    useEffect(()=>{
        findById(itemId).then((results)=>{
            setDetails(results.detailts);
            setLoading(false);
            setData(results.order)
            setFullAdress(results.fulladdress);

        })
        useAddEvent(CALLBACK_ADDRESS_SCREEN,(callbackData:any)=>{
            setData({...data,...callbackData})
            setFullAdress(callbackData.fullAddress)
        })
       return ()=>{
           useRemoveEvent(CALLBACK_ADDRESS_SCREEN)
       }

    },[itemId])
    /** tracking product amount */
    useEffect(()=>{

       const productAmount = details.reduce((prevData:any,nextData:any)=>{
           const total = (prevData)+(nextData.price*nextData.quantity);
            return total;
       },0)

        const {ship,refunded,incurredCost,paid,discountType,discountValue} =data;
        let discount:any = 0;
        if (discountType==="PERCENT"){
            discount = ((productAmount*discountValue)/100)
        }else {
            discount = discountValue;
        }
        const orderAmount = parseInt(productAmount)+parseInt(ship)-parseInt(discount);
        setData({...data,productAmount:productAmount,orderAmount:orderAmount});

    },[data.ship,data.discountValue,details])

    const gotoAddress = ()=>{
        navigation.navigate("orderaddress",{
            data:data
        })
    }
    const onChangeInputOrder = (field:string,value:any)=>{
        value = parseInt(value);
        switch (field){
            case 'ship': setData({...data,ship:value});break;
            case 'incurredCost': setData({...data,incurredCost:value});break;
            case 'paid': setData({...data,paid:value});break;
            case 'cost': setData({...data,cost:value});break;
            case 'discountValue': setData({...data,discountValue:value});break;

        }
    }
    const onChangeValue = useCallback((field,value,index)=>{
            setDetails((prevData:any)=>{

                const updated = prevData.map((item:any,i:number)=>{
                    if (index===i){
                        switch (field){
                            case 'price': item.price = value;break
                            case 'quantity': item.quantity = value;break
                            case 'owe': item.owe = value;break
                        }
                    }
                    return item;
                })
                return updated
            })


    },[]);
    const onRemoveItem = useCallback((index)=>{
        setDetails((prevData:any)=>{
            const updated = prevData.filter((item:any,i:number)=>{
                return index!==i
            })
            return updated
        })
    },[]);
    const handleSelectTypeDiscount = (item:any)=>{
        setData({...data,discountType:item.type,discountValue:0})
    }
    const renderTypeDiscount = ()=>{
        const getColorDiscount = (type:string)=>{
            if (type===data.discountType) return{borderColor:"#fd4900"}
            else return{borderColor:"#808080"}
        }
        return DISCOUNTTYPE.map((item,index)=>{
            return(
                <Icon key={index} style={{...getColorDiscount(item.type),padding:5,marginLeft:5,marginRight:5,borderWidth:1,borderRadius:10,}}
                      size={15}
                      onPress={()=>handleSelectTypeDiscount(item)}
                      name={item.icon}/>
            )
        })

    }
    const submit =()=>{
        const dataRequest = {...data,detailts:details};
        createAndUpdate(dataRequest).then((results)=>{
            toast.show({
                placement:'top',
                status:'success',
                title:'Thông báo',
                description:'Cập nhật thành công'
            })
        })
    }
    return(
        <Layout loading={loading}>
            <View style={{padding:5,flex:1}}>
                <ScrollView>
                    <View >
                        <TouchableOpacity onPress={gotoAddress}>
                            <View style={{backgroundColor:"#fff",borderRadius:10,padding:10,marginTop:10}}>
                                <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <Icons  size={20} name={'map-marker-alt'} color={'red'}/>
                                    <Text style={{fontSize:20,marginLeft:20,textTransform:"uppercase",fontWeight:"bold"}}>Địa chỉ nhận hàng</Text>
                                </View>
                                <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:5}}>
                                    <Text style={{fontWeight:"bold"}}>{data.billingFullName}</Text>
                                    <Text style={{fontWeight:"bold"}}>{data.billingPhoneNumber}</Text>
                                </View>
                                <Text style={{marginTop:5}}>{fullAdress}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{backgroundColor:"#fff",borderRadius:10,padding:10,marginTop:10}}>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <Icons  size={20} name={'credit-card'} color={'red'}/>
                                <Text style={{fontSize:20,marginLeft:20,textTransform:"uppercase",fontWeight:"bold"}}>Phương thức thanh toán</Text>
                            </View>
                            <Text style={{marginTop:10}}>Chuyển khoản trước 50%</Text>
                        </View>
                        <View>
                            <View style={{backgroundColor:"#fff",borderRadius:10,padding:10,marginTop:10,display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <Icons  size={20} name={'info-circle'} color={'red'}/>
                                <Text style={{fontSize:20,marginLeft:20,textTransform:"uppercase",fontWeight:"bold"}}>Chi tiết sản phẩm</Text>
                            </View>
                        </View>

                    </View>
                    {details && details.map((item:any,index:number)=>{
                        return(
                            <ItemDetail key={index} data={item}
                                        price={item.price}
                                        index={index}
                                        owe={item.owe}
                                        quantity={item.quantity}
                                        onRemove={onRemoveItem}
                                        onChangeValue={onChangeValue}/>
                        )
                    })}

                    <View style={{borderRadius:10,backgroundColor:"#fff",padding:10,marginBottom:20}}>
                        <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",marginTop:5}}>
                            <Text>Tổng tiền hàng:</Text>
                            <Text style={{textAlign:"right",fontWeight:"bold"}}>
                                <NumberFormat value={data.productAmount?data.productAmount:0}
                                              displayType={'text'}
                                              suffix={' đ'}
                                              thousandSeparator={true}
                                              renderText={(text)=><Text>{text}</Text>}/>
                            </Text>
                        </View>

                        <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",marginTop:5,alignItems:"center"}}>
                            <Text>Phí vận chuyển:</Text>
                            <View>
                                <NumberFormatInput  value={data.ship?data.ship.toString():'0'}
                                                    surfix={'đ'}
                                                    style={{textAlign:"right"}}
                                                    onChangeText={(text:any) => onChangeInputOrder('ship',text)}
                                                    keyboardType={'numeric'}/>
                            </View>


                        </View>
                        <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",marginTop:5,alignItems:"center"}}>

                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <Text>Chiết khấu:</Text>
                                <View style={{display:"flex",flexDirection:"row"}}>
                                    {renderTypeDiscount()}
                                </View>
                            </View>
                            <View >
                                <NumberFormatInput  value={data.discountValue}
                                                    surfix={data.discountType==='PERCENT'?'%':'đ'}
                                                    style={{textAlign:"right"}}
                                                    onChangeText={(text:any) => onChangeInputOrder('discountValue',text)}
                                                    keyboardType={'numeric'}/>
                            </View>


                        </View>
                        <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",marginTop:5,alignItems:"center"}}>
                            <Text>Chi phí phát sinh:</Text>
                            <View>
                                <NumberFormatInput  value={data.incurredCost?data.incurredCost.toString():'0'}
                                                    surfix={'đ'}
                                                    style={{textAlign:"right"}}
                                                    onChangeText={(text:any) => onChangeInputOrder('incurredCost',text)}
                                                    keyboardType={'numeric'}/>
                            </View>

                        </View>
                        <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",marginTop:5,alignItems:"center"}}>
                            <Text>Tổng hóa đơn:</Text>
                            <NumberFormat value={data.orderAmount?data.orderAmount:0}
                                          displayType={'text'}
                                          suffix={' đ'}
                                          thousandSeparator={true}
                                          renderText={(text)=><Text>{text}</Text>}/>
                        </View>
                        <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",marginTop:5,alignItems:"center"}}>
                            <Text>Đã thanh toán :</Text>
                            <View>
                                <NumberFormatInput  value={data.paid?data.paid.toString():'0'}
                                                    surfix={'đ'}
                                                    style={{textAlign:"right"}}
                                                    onChangeText={(text:any) => onChangeInputOrder('paid',text)}
                                                    keyboardType={'numeric'}/>
                            </View>
                        </View>
                        <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",marginTop:5,alignItems:"center"}}>
                            <Text>Còn nợ:</Text>
                            <NumberFormat value={data.orderAmount && data.paid?data.orderAmount-data.paid:0}
                                          displayType={'text'}
                                          suffix={' đ'}
                                          thousandSeparator={true}
                                          renderText={(text)=><Text>{text}</Text>}/>

                        </View>
                        <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",marginTop:5,alignItems:"center"}}>
                            <Text>Vốn:</Text>
                            <View>
                                <NumberFormatInput  value={data.cost?data.cost.toString():'0'}
                                                    surfix={'đ'}
                                                    style={{textAlign:"right"}}
                                                    onChangeText={(text:any) => onChangeInputOrder('cost',text)}
                                                    keyboardType={'numeric'}/>
                            </View>

                        </View>
                    </View>
                </ScrollView>



                <View style={{display:"flex",flexDirection:"row",backgroundColor:"#fff",padding:10}}>
                    <View style={{flex:3}}>
                        <Text>Tổng đơn hàng</Text>
                        <NumberFormat displayType={'text'}
                                      value={data.orderAmount?data.orderAmount:0}
                                      suffix={' đ'}
                                      thousandSeparator={true}
                                      renderText={(text)=><Text style={{fontWeight:"bold"}}>{text}</Text>} />
                    </View>
                    <TouchableOpacity>
                        <Button style={{flex:1}}
                                onPress={submit}
                                color={"#f51a2d"} >Cập nhật</Button>
                    </TouchableOpacity>

                </View>
            </View>
        </Layout>
    )
}
export default OrderDetail;
