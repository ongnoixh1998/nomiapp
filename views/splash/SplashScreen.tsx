import {ActivityIndicator, Image, Text, View} from "react-native";
import React, {useEffect} from "react";
import {useLayoutEffect} from "react";
import {checkToken, getToken, logout} from "../../services/UserService";
import {useNavigation} from "@react-navigation/native";

const SplashScreen = ()=>{
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(()=>{
            getToken().then((results) => {
                if (results) {
                    checkToken(results).then((data)=>{
                        if (data.success){
                            // @ts-ignore
                            navigation.navigate("root");
                        }else {
                            logout().then(()=>{
                                // @ts-ignore
                                navigation.navigate("login")
                            })
                        }
                    })
                } else {
                    // @ts-ignore
                    navigation.navigate("login")
                }
            })
        },1000)

    })

    return(
        <View style={{flex:1,display:'flex',justifyContent:"center",alignItems:"center"}}>
            <Image source={{uri: 'https://caysenda.vn/resources/upload/NOMI.png',}}
                   style={{
                       width: 200,
                       height: 200,
                       resizeMode: 'contain'
                   }}/>
                   <Text>Đang tải thông tin...</Text>
                   <ActivityIndicator/>
        </View>
    )
}
export default SplashScreen;
