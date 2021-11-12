import {SafeAreaView, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";

import LoadingScreen from "../views/loading/LoadingScreen";
import {useNavigation} from "@react-navigation/native";
import {Box, HStack, Icon, IconButton, Menu, Pressable, Text, HamburgerIcon} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useRoute } from '@react-navigation/native';
import {useAddEvent, useRemoveEvent} from "../hook/useEventListener";
interface LayoutProps {
    children:any,
    loading?:boolean
}
const LayoutOrder = ({loading =false,children}:LayoutProps)=>{
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
            {title:"Xóa hóa đơn", action:"remove"},
            {title:"Thùng rác", action:"trash"},
            {title:"Khôi phục", action:"restore"},
            {title:"In hóa đơn", action:"print"},
            {title:"Chờ thanh toán", action:"pendding"},
            {title:"Hủy đơn hàng", action:"cancel"},
            {title:"Đã hoàn thành", action:"success"},
            {title:"Đang xử lý", action:"processing"},
            {title:"Đang vận chuyển", action:"shipping"},
            {title:"Chờ Phát Bổ Sung", action:"awaitingadditionaldelivery"},
            {title:"Đã thanh một phầm", action:"partiallypaid"},
            {title:"Đã thanh toán", action:"paid"},
        ]
        return actions;
    }
    const handlerAction = (action:string)=>{

        console.log(navigation.getState())
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
                           <IconButton onPress={gotoQR} icon={<Icon as={<FontAwesome5 name='qrcode' />} size='sm' color="white" />} />
                           <Menu
                               w="190"
                               trigger={(triggerProps) => (<IconButton {...triggerProps} icon={<Icon as={<FontAwesome5 name='ellipsis-v' />} size='sm' color="white" />} />)}>
                               {getListAction().map((item,index)=>{
                                   return(
                                       <Menu.Item key={index} onPress={()=>handlerAction(item.action)}>{item.title}</Menu.Item>
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
