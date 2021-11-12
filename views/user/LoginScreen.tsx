import {Image,TouchableOpacity, View} from "react-native";
import React, {useEffect, useLayoutEffect, useState} from "react";

import {getToken, login} from "../../services/UserService";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {Button, Input, Stack} from "native-base";

export default function () {
    const navigation = useNavigation();
    const [loadding, setLoadding] = useState(true)
    const [userName, setUserName] = useState('lakdak4');
    const [password, setPassword] = useState('123456')
    useLayoutEffect(() => {
        getToken().then((results) => {
            if (results) {
                // @ts-ignore
                navigation.navigate("root")
            } else {
                setLoadding(false)
            }
        })
    })

    const handlerLogin = () => {
        if (userName && password){
            login(userName, password).then((results) => {
                if (results){
                    // @ts-ignore
                    navigation.navigate("root")
                }else {
                    Toast.show({
                        text1:'Thông báo',
                        text2:'Thông tin không chính xác',
                        position:'bottom',
                        type:'error'
                    })
                }
            })
        }else {
            Toast.show({
                text1:'Thông báo',
                text2:'Vui lòng điền đầy đủ thông tin',
                position:'bottom',
                type:'error'
            })
        }

    }
    return (
        <View style={{flex: 1, backgroundColor: "#fff"}}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Image source={{uri: 'https://caysenda.vn/resources/upload/NOMI.png',}}
                       style={{
                           width: 200,
                           height: 200,
                           resizeMode: 'contain'
                       }}/>
            </View>
            <View style={{padding: 20}}>
                <Stack space={'2'} >
                    <Input value={userName}
                           onChangeText={(text) => setUserName(text)}
                           placeholder={'Tài khoản'}/>
                    <Input secureTextEntry={true}
                           value={password}
                           onChangeText={(text) => setPassword(text)}
                           placeholder={'Mật khẩu'}/>
                    <TouchableOpacity>
                        <Button onPress={handlerLogin}
                                style={{marginTop: 10}}>Đăng nhập</Button>
                    </TouchableOpacity>
                </Stack>

            </View>
        </View>
    )
}
