import React, {Component, useState} from 'react';

import {
    SafeAreaView, TextInput, View
} from 'react-native';

import {RNCamera} from 'react-native-camera';

import BarcodeMask from "react-native-barcode-mask";
import QRCodeScanner from "react-native-qrcode-scanner";
import {useNavigation} from "@react-navigation/native";
import {Button} from "native-base";
import {useDispatchEvent} from "../../hook/useEventListener";

export default function QRScreen() {
    const [code, setCode] = useState('')
    const [flash,setFlash] = useState(false);
    const navigation = useNavigation();
    const handleConfirm = () => {
        navigation.goBack();
        useDispatchEvent('qr.callback',{id:code})

    }
    const success = (e:any)=>{
        navigation.goBack();
        useDispatchEvent('qr.callback',{id:e.data})

    }
    const toggleFlash = ()=>{
        setFlash(!flash)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <QRCodeScanner
                showMarker
                topViewStyle={{ display: 'none' }}
                bottomViewStyle={{ display: 'none' }}
                cameraProps={{flashMode:flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}}
                customMarker={
                    <BarcodeMask
                        edgeColor={ '#fff' }
                        edgeWidth={ 50 }
                        edgeHeight={ 50 }
                        edgeBorderWidth={ 5 }
                        showAnimatedLine={ false }
                    />
                } onRead={success}/>
            <View>
                <Button onPress={toggleFlash}>{flash?'Tắt flash':'Bật flash'}</Button>
            </View>
            <View style={{display: "flex", justifyContent: "center", flexDirection: "column", marginBottom: 10}}>
                <TextInput style={{backgroundColor: "#fff"}}
                           value={code ? code : ''}
                           onChangeText={(e) => setCode(e)}
                           placeholder={'Nhập vào mã đơn hàng'}/>
                <Button onPress={() => handleConfirm()}>Xác nhận</Button>
            </View>
        </SafeAreaView>

    )
}
