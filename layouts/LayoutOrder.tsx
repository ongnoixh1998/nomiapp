import {SafeAreaView, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";

import LoadingScreen from "../views/loading/LoadingScreen";
import {useNavigation} from "@react-navigation/native";
import {Box, HStack, Icon, IconButton, Menu, Pressable, Text, HamburgerIcon} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useRoute } from '@react-navigation/native';
import {useAddEvent, useRemoveEvent} from "../hook/useEventListener";
import {
    AWAITINGADDINTIONDELIVERY_ACTION,
    CANCEL_ACTION, PAID_ACTION, PARTIALPAID_ACTION,
    PENDDING_ACTION,
    PRINT_ACTION, PROCESSING_ACTION,
    REMOVE_ACTION,
    RESTORE_ACTION, SEARCH_ACTION, SHIPPING_ACTION, SUCCESS_ACTION,
    TRASH_ACTION
} from "../constants/ACTION_CONSTANTS";
interface LayoutProps {
    children:any,
    loading?:boolean,
    callbackActions?:any
}
const LayoutOrder = ({loading =false,children,callbackActions}:LayoutProps)=>{
    const navigation = useNavigation();
   const route = useRoute();
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    useEffect(()=>{
        useAddEvent('qr.callback',(e:any)=>{
           gotoQRScanned(e.id)
            console.log("QR scanned")
        })
        return ()=>{
            useRemoveEvent('qr.callback')
        }
    },[])
    const gotoQRScanned = (id:string)=>{
        // @ts-ignore
        navigation.navigate("qrscanned",{id:id})
    }
    const gotoQR = ()=>{
        // @ts-ignore
        navigation.navigate("qrcode")
    }
    const getListAction = ()=>{
        const actions = [
            {title:"Xóa hóa đơn", action:REMOVE_ACTION},
            {title:"Thùng rác", action:TRASH_ACTION},
            {title:"Khôi phục", action:RESTORE_ACTION},
            {title:"Chờ thanh toán", action:PENDDING_ACTION},
            {title:"Hủy đơn hàng", action:CANCEL_ACTION},
            {title:"Đã hoàn thành", action:SUCCESS_ACTION},
            {title:"Đang xử lý", action:PROCESSING_ACTION},
            {title:"Đang vận chuyển", action:SHIPPING_ACTION},
            {title:"Chờ Phát Bổ Sung", action:AWAITINGADDINTIONDELIVERY_ACTION},
            {title:"Đã thanh một phầm", action:PARTIALPAID_ACTION},
            {title:"Đã thanh toán", action:PAID_ACTION},
        ]
        return actions;
    }
    const handlerAction = (action:string)=>{
      if (callbackActions){
          callbackActions(action);
      }
    }
    if (loading){
        return <LoadingScreen/>
    }else {
        return(
            <SafeAreaView style={{flex:1}}>
               <View>
                   <Box safeAreaTop backgroundColor="#6200ee" />
                   <HStack bg='#6200ee' px="1" py="3" justifyContent='space-between' alignItems='center'>
                       <HStack space="4" alignItems='center'>
                           <Text color="white" fontSize="20" fontWeight='bold'>Danh sách hóa đơn</Text>
                       </HStack>
                       <HStack display={'flex'} flexDirection={'row'} alignItems={'center'} space="3">
                           <IconButton onPress={()=>handlerAction(SEARCH_ACTION)} icon={<Icon as={<FontAwesome5 name='search' />} size='sm' color="white" />} />
                           <IconButton onPress={gotoQR} icon={<Icon as={<FontAwesome5 name='qrcode' />} size='sm' color="white" />} />

                           <Menu
                               w="190"
                               trigger={(triggerProps) => (<IconButton {...triggerProps} icon={<Icon as={<FontAwesome5 name='ellipsis-v' />} size='sm' color="white" />} />)}>
                               {getListAction().map((item,index)=>{
                                   return(
                                       <Menu.Item key={index}
                                                  onPress={()=>handlerAction(item.action)}>{item.title}</Menu.Item>
                                   )
                               })}

                           </Menu>
                       </HStack>
                   </HStack>
               </View>
                {children}
            </SafeAreaView>

        )
    }

}
export default LayoutOrder;
