import {FlatList, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import OrderItem from "./components/OrderItem";
import {findAll} from "../../services/OrderService";
import Layout from "../../layouts/Layout";
import LayoutOrder from "../../layouts/LayoutOrder";

export default function OrderScreen(props:any){

    const [page,setPage] = useState(0);
    const [pageSize,setPageSize] = useState(20)
    const [totalPage,setTotalPage] = useState(1);
    const [totalElement,setTotalElement] = useState(1);

    const [loading,setLoading] = useState(true);
    const [list,setList] = useState([]);
    const [GHN,setGHN] = useState([]);
    const [tracking,setTracking] = useState([]);

    useEffect(()=>{
        findAll(page,pageSize).then((results)=>{
            setList(results.data.content);
            setLoading(false);
        })
    },[])

    return(
        <LayoutOrder loading={loading}>
            <View>
                <FlatList data={list}
                          renderItem={({item,index})=>{
                              return(
                                  <OrderItem key={index} data={item}/>
                              )
                          }}/>
            </View>
        </LayoutOrder>
    )

}
