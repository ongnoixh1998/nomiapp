import {SafeAreaView, StyleProp, Text, TextStyle, View, ViewStyle} from "react-native";
import React from "react";

import LoadingScreen from "../views/loading/LoadingScreen";
interface LayoutProps {
    children:any,
    loading?:boolean,
    style?:StyleProp<ViewStyle>
}
const Layout = ({loading =false,children,style}:LayoutProps)=>{
    const styles = style?style:{}
    if (loading){
        return <LoadingScreen/>
    }else {
        return(
            <SafeAreaView style={style?style:{flex:1}}>
                {children}
            </SafeAreaView>
        )
    }

}
export default Layout;
