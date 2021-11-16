import {ActivityIndicator, FlatList, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import OrderItem from "./components/OrderItem";
import {actions, findAll} from "../../services/OrderService";
import Layout from "../../layouts/Layout";
import LayoutOrder from "../../layouts/LayoutOrder";
import {SEARCH_ACTION} from "../../constants/ACTION_CONSTANTS";
import {useNavigation} from "@react-navigation/native";
import {useAddEvent, useRemoveEvent} from "../../hook/useEventListener";
import {CALLBACK_SEARCH_ORDER_SCREEN} from "../../constants/EVENT_CONSTANTS";
import {useToast} from "native-base";

interface SearchOrderCallbackType {
    filterValue: string,
    hostValue: number,
    keywordValue: string
}

export default function OrderScreen(props: any) {
    const navigation = useNavigation();
    const toast = useToast();
    const [filter, setFilter] = useState<string>('incomplate');
    const [host, setHost] = useState<number | undefined>()
    const [keyword, setKeyword] = useState<string>('')
    const [loadmore, setLoadmore] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState<number>(20)
    const [totalPage, setTotalPage] = useState<number>(1);
    const [totalElement, setTotalElement] = useState<number>(1);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<any>([]);
    const [GHN, setGHN] = useState([]);
    const [tracking, setTracking] = useState([]);
    const [listChecked, setListChecked] = useState<any>([]);


    useEffect(() => {
        findAll(page, pageSize, filter).then((results) => {
            setList(results.data.content);
            setTotalPage(results.data.totalPages);
            setTotalElement(results.data.totalElements);
            setLoading(false);
        })
        useAddEvent(CALLBACK_SEARCH_ORDER_SCREEN, ({filterValue, hostValue, keywordValue}: SearchOrderCallbackType) => {
            setLoading(true);
            setFilter(filterValue);
            setHost(hostValue);
            setKeyword(keywordValue);
            findAll(0, pageSize, filterValue, hostValue, keywordValue).then((results) => {

                setList(results.data.content);
                setLoading(false);
            })
        })
        return () => {
            useRemoveEvent(CALLBACK_SEARCH_ORDER_SCREEN)
        }
    }, [])
    const gotoSearchScreen = () => {
        // @ts-ignore
        navigation.navigate("ordersearch")
    }
    const callbackActions = useCallback((actionValue) => {
        if (actionValue === SEARCH_ACTION) {
            gotoSearchScreen();
        } else {

            if (listChecked.length > 0) {
                actions(actionValue, listChecked).then((results) => {
                    setLoading(true)
                    findAll(page, pageSize, filter, host, keyword).then((results) => {
                        setList(results.data.content);
                        setLoading(false);
                        setListChecked([])
                    })
                })
            } else {
                toast.show({
                    title: 'Thông báo',
                    placement: 'top',
                    description: 'Vui lòng chọn hóa đơn',
                    status: 'error'
                })
            }

        }

    }, [listChecked])
    const handleCheckBox = useCallback((id: any) => {
        setListChecked((prevState: any) => {
            if (!prevState.includes(id)) {
                return [...prevState, id];
            } else {
                return prevState.filter((item: any) => item !== id)
            }
        })

    }, []);
    const getChecked = (id: any) => {
        // @ts-ignore
        return listChecked.includes(id);
    }
    const onRefreshData = () => {
        setRefreshing(true)
        findAll(0, pageSize, filter, host, keyword).then((results) => {
            setPage(0)
            setTotalPage(results.data.totalPages);
            setTotalElement(results.data.totalElements);
            setList(results.data.content);
            setListChecked([]);
            setRefreshing(false)
        })
    }
    const loadMore = () => {

        const newPage = page + 1

        if (newPage<totalPage){
            console.log(newPage,totalPage);
            setLoadmore(true)
            setPage(newPage);
            findAll(newPage, pageSize, filter, host, keyword).then((results) => {
                console.log(results.data.content);
                setList([...list,...results.data.content]);
                setTotalPage(results.data.totalPages);
                setTotalElement(results.data.totalElements);
                setLoadmore(false);
            })
        }


    }
    return (
        <LayoutOrder loading={loading} callbackActions={callbackActions}>
            <View style={{flex: 1}}>
                <FlatList data={list}
                          refreshing={refreshing}
                          onRefresh={onRefreshData}
                          onEndReached={loadMore}
                          ListFooterComponent={loadmore ?
                              <View style={{alignItems: "center"}}><ActivityIndicator/></View> : <Text></Text>}
                          renderItem={({item, index}: any) => {
                              return (
                                  <OrderItem key={index} data={item} checked={getChecked(item.id)}
                                             onChangeCheck={handleCheckBox}/>
                              )
                          }}/>
            </View>
        </LayoutOrder>
    )

}
