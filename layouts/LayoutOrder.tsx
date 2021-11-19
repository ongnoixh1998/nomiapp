import {SafeAreaView, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";

import LoadingScreen from "../views/loading/LoadingScreen";
import {useNavigation} from "@react-navigation/native";
import {Box, HStack, Icon, IconButton, Menu, Pressable, Text, HamburgerIcon, Modal, Button, VStack} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useRoute} from '@react-navigation/native';
import {useAddEvent, useRemoveEvent} from "../hook/useEventListener";
import {
    AWAITINGADDINTIONDELIVERY_ACTION, CALLBACK_SEARCH_LAYOUT,
    CANCEL_ACTION, PAID_ACTION, PARTIALPAID_ACTION,
    PENDDING_ACTION,
    PRINT_ACTION, PROCESSING_ACTION,
    REMOVE_ACTION,
    RESTORE_ACTION, SEARCH_ACTION, SHIPPING_ACTION, SUCCESS_ACTION,
    TRASH_ACTION
} from "../constants/ACTION_CONSTANTS";
import {CALLBACK_QR_SCREEN} from "../constants/EVENT_CONSTANTS";

interface LayoutProps {
    children: any,
    loading?: boolean,
    callbackActions?: any,
    totalElements:any
}

const LayoutOrder = ({loading = false, children, callbackActions,totalElements}: LayoutProps) => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false)
    const [inputCode,setInputCode] = useState('');
    const [inputSearch,setInputSearch] = useState('');
    const [time,setTime] = useState<any>();
    useEffect(() => {
        useAddEvent(CALLBACK_QR_SCREEN, (e: any) => {
            gotoQRScanned(e.id)
            console.log("QR scanned")
        })
        return () => {
            useRemoveEvent(CALLBACK_QR_SCREEN)
        }
    }, [])
    const gotoQRScanned = (id: string) => {
        // @ts-ignore
        navigation.navigate("qrscanned", {id: id})
    }
    const gotoQR = () => {
        // @ts-ignore
        navigation.navigate("qrcode")
    }
    const listMenu = ()=>{
        return [
            {
                title:"Tìm kiếm",
                action:"search",
                icon:"search"
            },
            {
                title:"Gõ mã",
                action:"gotosearchladdingcode",
                icon:"keyboard"
            },
            {
                title:"Quét QR",
                action:"qr",
                icon:"qrcode"
            }
        ]
    }
    const handleMenu = (action:string)=>{
       switch (action){
           case "search": handlerAction(action); break;
           case "gotosearchladdingcode": setShowModal(true); break;
           case "qr":gotoQR(); break;
       }
    }
    const getListAction = () => {
        const actions = [
            {title: "Xóa hóa đơn", action: REMOVE_ACTION},
            {title: "Thùng rác", action: TRASH_ACTION},
            {title: "Khôi phục", action: RESTORE_ACTION},
            {title: "Chờ thanh toán", action: PENDDING_ACTION},
            {title: "Hủy đơn hàng", action: CANCEL_ACTION},
            {title: "Đã hoàn thành", action: SUCCESS_ACTION},
            {title: "Đang xử lý", action: PROCESSING_ACTION},
            {title: "Đang vận chuyển", action: SHIPPING_ACTION},
            {title: "Chờ Phát Bổ Sung", action: AWAITINGADDINTIONDELIVERY_ACTION},
            {title: "Đã thanh một phầm", action: PARTIALPAID_ACTION},
            {title: "Đã thanh toán", action: PAID_ACTION},
        ]
        return actions;
    }
    const handlerAction = (action: string,data?:any) => {
        if (callbackActions) {
            callbackActions(action,data);
        }
    }

    const submitLaddingCode = ()=>{
        setShowModal(false);
        gotoQRScanned(inputCode);
        setInputCode('')
    }
    const onChangeInputSearch = (text:string)=>{
        if (time) clearTimeout(time);
        setInputSearch(text);
        setTime(setTimeout(()=>{
            handlerAction(CALLBACK_SEARCH_LAYOUT,text);
        },200))
    }
    if (loading) {
        return <LoadingScreen/>
    } else {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View>
                    <VStack bg='grey' px="1" py="1" pb={'2'} >
                        <HStack flexDirection={'row'} alignItems='center'>
                            <HStack flex={1}>
                                <Text color="white" fontSize="20" marginRight={15} fontWeight='bold'>Đơn hàng({totalElements?totalElements:0})</Text>
                            </HStack>
                            <HStack display={'flex'} flexDirection={'row'} alignItems={'center'} space="3">
                                <Menu
                                    w="190"
                                    trigger={(triggerProps) => (<IconButton {...triggerProps}
                                                                            icon={<Icon as={<FontAwesome5 name='plus'/>}
                                                                                        size='sm' color="white"/>}/>)}>
                                    {listMenu().map((item, index) => {
                                        return (
                                            <Menu.Item key={index}
                                                       onPress={() => handleMenu(item.action)}>
                                                <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                                    <FontAwesome5 name={item.icon} size={20}/>
                                                    <Text style={{fontSize:15,marginLeft:5}}>{item.title}</Text>
                                                </View>
                                            </Menu.Item>
                                        )
                                    })}

                                </Menu>

                                <Menu
                                    w="190"
                                    trigger={(triggerProps) => (<IconButton {...triggerProps} icon={<Icon
                                        as={<FontAwesome5 name='ellipsis-v'/>} size='sm' color="white"/>}/>)}>
                                    {getListAction().map((item, index) => {
                                        return (
                                            <Menu.Item key={index}
                                                       onPress={() => handlerAction(item.action)}>{item.title}</Menu.Item>
                                        )
                                    })}

                                </Menu>
                            </HStack>
                        </HStack>
                        <View>
                            <TextInput style={{backgroundColor:"#fff",borderRadius:20}}
                                       value={inputSearch}
                                       onChangeText={(text => onChangeInputSearch(text))}
                                       placeholder={'Tìm kiếm'}/>
                        </View>
                    </VStack>

                </View>
                {children}
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Nhập mã vận đơn</Modal.Header>
                        <Modal.Body>
                            <TextInput placeholder={'Nhập mã vận đơn'} value={inputCode} onChangeText={(text)=>setInputCode(text)}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onPress={submitLaddingCode}>Xác nhận</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </SafeAreaView>

        )
    }

}
export default LayoutOrder;
