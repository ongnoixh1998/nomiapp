import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {memo, useState} from "react";
import validator from "validator/index";
import {Button, Input} from "native-base";
import NumberFormat from "react-number-format";
import {NumberFormatInput} from "../../../components/NumberFormatInput";
interface ItemDetailType {
    data:any,
    onChangeValue?:any,
    index:number,
    price:number,
    quantity:number,
    owe:number,
    onRemove:any
}
const ItemDetail = ({data,onChangeValue,index,onRemove}:ItemDetailType)=>{
    const getUrlImage = ()=>{
        const urlImage = data.variantThumbnail?data.variantThumbnail:data.productThumbnail;
        if (validator.isURL(urlImage)){
            return urlImage;
        }else {
            return "https://caysenda.vn"+urlImage
        }
    }
    return(
        <View style={{marginTop:5,marginBottom:5,backgroundColor:"#fff",borderRadius:20}}>
            <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                <Image style={{flex:1,borderRadius:20}}
                       source={{
                           uri:getUrlImage(),
                           width:80,
                           height:80,
                           cache:'only-if-cached'
                       }} />
               <View  style={{flex:3,marginLeft:5}}>
                   <Text>{data.name}</Text>
                   <Text>{data.variantName}</Text>
                   <Text style={{fontWeight:"bold",marginTop:10}}>
                       Tổng:
                       <NumberFormat value={data.price*data.quantity}
                                     suffix={' đ'}
                                     thousandSeparator={true} displayType={'text'}
                                     renderText={(text)=><Text>{text}</Text>}/>
                   </Text>
               </View>
            </View>
            <View style={{display:"flex",flexDirection:"row"}}>
                <NumberFormatInput style={{borderWidth:1,borderRadius:10,flex:1,margin:5,textAlign:"center",borderColor:"#d4d4d4"}}
                                   value={data.price?data.price.toString():'0'}
                                   keyboardType={'numeric'}
                                   onChangeText={(text:string)=>onChangeValue('price',text,index)}/>

                <Input style={{borderWidth:1,borderRadius:10,flex:1,margin:5,textAlign:"center",borderColor:"#d4d4d4"}}
                           keyboardType={'numeric'}
                           value={data.quantity?data.quantity.toString():'0'}
                           onChangeText={(text)=>onChangeValue('quantity',text,index)}
                           placeholder={'Số lượng'}/>
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                <Input style={{borderWidth:1,borderRadius:10,flex:2,margin:5,textAlign:"center",borderColor:"#d4d4d4"}}
                           keyboardType={'numeric'}
                           value={data.owe?data.owe.toString():'0'}
                           onChangeText={(text)=>onChangeValue('owe',text,index)}
                           placeholder={'Nợ'}/>
                <View style={{flex:1,display:"flex",justifyContent:"center"}}>
                    <Button  color={"#f80b0b"} onPress={()=>onRemove(index)}>Xóa</Button>
                </View>
            </View>
        </View>
    )
}
export default memo(ItemDetail);
