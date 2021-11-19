import {Text, View} from "react-native";
import React from "react";
import CountOrder from "./components/CountOrder";
import StatictisOrder from "./components/StatictisOrder";
import {useNavigation} from "@react-navigation/native";
import Layout from "../../layouts/Layout";
import {Center, HStack, SimpleGrid, VStack} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function (){
    const navigation = useNavigation();

    return(
       <Layout>
           <VStack style={{padding:10}} space={'3'}>
               <CountOrder/>
               <StatictisOrder/>
           </VStack>
       </Layout>

    )
}
