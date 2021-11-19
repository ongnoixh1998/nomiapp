import {Image, StatusBar, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from "@react-navigation/native";
import {logout} from "../../services/UserService";
import {Button} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
const UserScreen = ()=>{
    const navigation = useNavigation();
    const handlerLogout = ()=>{
        logout().then((results)=>{
            console.log("logout")
            // @ts-ignore
            navigation.navigate("login")
        })
    }
    return(
        <SafeAreaView>
            <Button color={'#f31c94'} onPress={handlerLogout}>Đăng xuất</Button>

        </SafeAreaView>
    )
}
export default UserScreen
