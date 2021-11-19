import { View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {logout} from "../../services/UserService";
import {Button} from "native-base";
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
        <View>
            <Button color={'#f31c94'} onPress={handlerLogout}>Đăng xuất</Button>

        </View>
    )
}
export default UserScreen
