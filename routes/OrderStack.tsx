import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
const Stack = createStackNavigator();
import OrderScreen from "../views/order/OrderScreen";
import QRScreen from "../views/qr/QRScreen";
import OrderDetail from "../views/order/OrderDetail";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import OrderAddressScreen from "../views/order/OrderAddressScreen";
import QRScannedScreen from "../views/qr/QRScannedScreen";
import GHNDetailScreen from "../views/ghn/GHNDetailScreen";
import GHNScreen from "../views/ghn/GHNScreen";
import TrackingOrderScreen from "../views/order/TrackingOrderScreen";
import OrderSearchScreen from "../views/order/OrderSearchScreen";

const OrderStack =  ({navigation,route}:any)=>{
    const listHiderTabbar = ["qrcode","ghndetail",'detail','orderaddress'];
    React.useLayoutEffect(() => {
        const routeName:string | undefined = getFocusedRouteNameFromRoute(route);
        if (listHiderTabbar.includes(routeName?routeName:'',0)){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }else {
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [navigation, route]);
    return(
        <Stack.Navigator >
            <Stack.Screen name={'orderlist'}
                          options={{title: 'Danh sách hóa đơn',headerShown:false}}
                          component={OrderScreen} />
            <Stack.Screen name={'qrcode'}
                          key={'qrcode'}
                          component={QRScreen} />
            <Stack.Screen name={'detail'}
                          key={'detail'}
                          options={{title:"Chi tiết đơn hàng"}}
                          component={OrderDetail} />
            <Stack.Screen name={'orderaddress'}
                          key={'orderaddress'}
                          options={{title:"Thông tin địa chỉ"}}
                          component={OrderAddressScreen} />
            <Stack.Screen name={'qrscanned'}
                          key={'qrscanned'}
                          options={{title:"Hóa đơn quét được"}}
                          component={QRScannedScreen} />
            <Stack.Screen name={'ghndetail'}
                          key={'ghndetail'}
                          options={{title:"Chi tiết đơn hàng"}}
                          component={GHNDetailScreen} />

            <Stack.Screen name={'trackingorder'}
                          key={'trackingorder'}
                          options={{title:"Thông tin vận chuyển TQ"}}
                          component={TrackingOrderScreen} />
            <Stack.Screen name={'ordersearch'}
                          key={'ordersearch'}
                          options={{title:"Tìm kiếm hóa đơn"}}
                          component={OrderSearchScreen} />
            <Stack.Screen name={'ghnscreen'}
                          key={'ghnscreen'}
                          options={{title:"Danh sách hóa đơn GHN"}}
                          component={GHNScreen} />
        </Stack.Navigator>
    )
}

export default OrderStack;
