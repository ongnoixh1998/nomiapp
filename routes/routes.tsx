import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import OrderStack from "./OrderStack";
import DashboardRoutes from "./DashboardRoutes";
import UserRoutes from "./UserRoutes";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../views/user/LoginScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import SplashScreen from "../views/splash/SplashScreen";
const NativeTab = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const DrawerLayout = ()=>{
    return(
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen name="drawer" component={Routes} />
        </Drawer.Navigator>
    )
}
const Routes = () => {

    return (
        <Tab.Navigator
            screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
            <Tab.Screen name={'dashboardbottomtab'}
                        options={{
                            headerTransparent: true,
                            tabBarIcon: () => {
                                return (<FontAwesome5 size={25} name={'home'}/>)
                            },
                            title: "Báo cáo"
                        }}
                        component={DashboardRoutes}/>
            <Tab.Screen name={'orderbottomtab'}
                        options={{
                            tabBarIcon: () => {
                                return (<FontAwesome5 size={25} name={'list-alt'}/>)
                            },
                            title: "Hóa đơn"
                        }}
                        component={OrderStack}/>
            <Tab.Screen name={'userbottomtab'}
                        options={{
                            header: () => null,
                            headerTransparent: true,
                            tabBarIcon: () => {
                                return (<FontAwesome5 size={25} name={'user'}/>)
                            },
                            title: "Tài khoản"
                        }}
                        component={UserRoutes}/>

        </Tab.Navigator>
    )
}

const RootTab = () => {
    return (
        <NavigationContainer>
            <NativeTab.Navigator screenOptions={{}}
                                 initialRouteName={'splashscreen'}
                                 defaultScreenOptions={{headerTransparent:true}}>
                <NativeTab.Screen name={'splashscreen'}
                                  options={{headerShown: false}}
                                  component={SplashScreen}/>
                <NativeTab.Screen name={'root'}
                                  options={{headerShown: false}}
                                  component={DrawerLayout}/>
                <NativeTab.Screen name={'login'}
                                  options={{title: "Đăng nhập", headerShown: false,headerTransparent:true}}
                                  component={LoginScreen}/>
            </NativeTab.Navigator>
        </NavigationContainer>
    )
}

export default RootTab;
