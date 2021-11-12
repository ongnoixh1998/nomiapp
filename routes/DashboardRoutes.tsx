import {View} from "react-native";
import OrderScreen from "../views/order/OrderScreen";
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DashboardScreen from "../views/dashboard/DashboardScreen";
import {useEffect, useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/native";
const Stack = createNativeStackNavigator();
export default function (){

    return(
        <Stack.Navigator >
            <Stack.Screen name={'dashboard'}
                          options={{ title: 'Báo cáo' }}
                          component={DashboardScreen} />
        </Stack.Navigator>
    )
}
