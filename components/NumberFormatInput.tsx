import NumberFormat from "react-number-format";
import {Text, TextInput, View} from "react-native";
import React from "react";
interface NumberFormatInputType{
    value:any,
    onChangeText:any,
    style?:any,
    surfix?:string,
    keyboardType?:any
}
export const NumberFormatInput = ({value,onChangeText,style,surfix,keyboardType}:NumberFormatInputType)=>{

    const onChangeValueInput = (text:any)=>{
        let regex = /\d+/g;
        let number = text.match(regex).join('');  // creates array from matches
        onChangeText(number)
    }
    return(
        <View style={{...style,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
            <NumberFormat value={value} thousandSeparator={true} displayType={'text'} renderText={(text)=>{
                return(
                    <TextInput style={{textAlign:"center"}} keyboardType={keyboardType?keyboardType:'default'} value={text} onChangeText={(t)=>onChangeValueInput(t)}/>
                )
            }}/>
            <Text style={{fontWeight:"bold"}}>{surfix}</Text>
        </View>

    )
}
