import {SafeAreaView, Text, View} from "react-native";
import React from "react";

import LoadingScreen from "../views/loading/LoadingScreen";
interface LayoutProps {
    children:any,
    loading?:boolean
}
const Layout = ({loading =false,children}:LayoutProps)=>{

    if (loading){
        return <LoadingScreen/>
    }else {
        return(
            <SafeAreaView style={{flex:1}}>
                {children}
            </SafeAreaView>
        )
    }

}
export default Layout;
