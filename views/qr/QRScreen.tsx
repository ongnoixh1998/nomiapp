import React, {Component, useState} from 'react';

import {
    SafeAreaView, TextInput, TouchableOpacity, View
} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import BarcodeMask from "react-native-barcode-mask";
import QRCodeScanner from "react-native-qrcode-scanner";
import {useNavigation} from "@react-navigation/native";
import {useDispatchEvent} from "../../hook/useEventListener";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RNQRGenerator from 'rn-qr-generator';
import {useToast} from "native-base";
import {CALLBACK_QR_SCREEN} from "../../constants/EVENT_CONSTANTS";

export default function QRScreen() {
    const toast = useToast();
    const [code, setCode] = useState('')
    const [flash, setFlash] = useState(false);
    const navigation = useNavigation();
    const handleConfirm = () => {
        navigation.goBack();
        useDispatchEvent(CALLBACK_QR_SCREEN, {id: code})

    }
    const success = (e: any) => {
        navigation.goBack();
        useDispatchEvent(CALLBACK_QR_SCREEN, {id: e.data})

    }
    const toggleFlash = () => {
        setFlash(!flash)
    }
    const getImageFromLibrary = () => {
        launchImageLibrary({selectionLimit: 1, mediaType: 'photo'}, ({assets}) => {
            if (assets) {
                const image = assets[0]
                RNQRGenerator.detect({uri:image.uri}).then((results)=>{
                    if (results.values.length>0){
                        const value = results.values[0];
                        success({data:value})
                    }else {
                        toast.show({
                            title:'Thông báo',
                            description:'Không quét được mã từ hình ảnh',
                            placement:'top',
                            status:'error'
                        })
                    }
                }).catch(()=>{
                    toast.show({
                        title:'Thông báo',
                        description:'Không quét được mã từ hình ảnh',
                        placement:'top',
                        status:'error'
                    })
                })
                console.log(image)
            }
        })
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <QRCodeScanner
                showMarker
                topViewStyle={{display: 'none'}}
                bottomViewStyle={{display: 'none'}}
                cameraProps={{flashMode: flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}}
                customMarker={
                    <BarcodeMask
                        edgeColor={'#fff'}
                        edgeWidth={50}
                        edgeHeight={50}
                        edgeBorderWidth={5}
                        showAnimatedLine={false}
                    />
                } onRead={success}/>
            <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 30}}>
                <TouchableOpacity onPress={getImageFromLibrary}>
                    <FontAwesome5 name={'image'} size={80} style={{margin: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFlash}>
                    <MaterialIcons name={'highlight'} size={80} style={{margin: 10}}
                                   color={flash ? '#f5c000' : '#cbcbcb'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}
