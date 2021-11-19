import {View, Text, StyleProp, TextStyle} from "react-native";
import React from "react";
interface CurrencyFormatType {
    value:string,
    surfix?:string
    style?:StyleProp<TextStyle>
}
const CurrencyFormat = ({value,style,surfix}:CurrencyFormatType)=>{
    const formatValue = ()=>{
        const valueInt = parseInt(value?value:'0')
        let re = '\\d(?=(\\d{' + (0 || 3) + '})+' + (0 > 0 ? '\\.' : '$') + ')';

        return (valueInt).toFixed(Math.max(0, ~~0) ).replace(new RegExp(re, 'g'), '$&,');
    }
    return(
        <Text  style={style?style:{}}>{formatValue()} {surfix?surfix:''}</Text>
    )
}
export default CurrencyFormat
