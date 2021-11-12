import {Image, StatusBar, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from "@react-navigation/native";
const UserScreen = ()=>{
    const navigation = useNavigation();
    const gotoProfile = ()=>{
        // @ts-ignore
        navigation.navigate("profile")
    }
    return(
        <View >
            <View style={{position:"relative",height:200}}>
                <Image source={require('../../static/imgs/gradient.png')}
                       style={{position:"absolute",width:'100%',top:0,left:0,right:0,bottom:0,height:'100%'}}/>
                <View style={{display:"flex",justifyContent:"flex-end",flexDirection:"row",padding:10}}>
                    <TouchableOpacity onPress={gotoProfile} >
                        <Icon name={'cog'} size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View>

            </View>

        </View>
    )
}
export default UserScreen
