
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "../views/user/ProfileScreen";
import UserScreen from "../views/user";
const Stack = createNativeStackNavigator();

export default function (){
    return(
        <Stack.Navigator >
            <Stack.Screen name={'user'}

                          options={{headerShown:false}}
                          component={UserScreen}/>
            <Stack.Screen name={'profile'}
                          options={{title:"Thông tin cá nhân"}}
                          component={ProfileScreen}/>
        </Stack.Navigator>
    )
}
