import {Text, View} from "react-native";
import React from "react";
import {Picker} from "@react-native-picker/picker";

const SelectBox = ()=>{
    const onChangeValue = ()=>{

    }
    return(
        <View style={{}}>
            <Picker mode={'dialog'} onValueChange={onChangeValue}>
                <Picker.Item label={'asdasd1'} value={'asdasd1'}/>
                <Picker.Item label={'asdasd2'} value={'asdasd2'}/>
                <Picker.Item label={'asdasd3'} value={'asdasd3'}/>
                <Picker.Item label={'asdasd4'} value={'asdasd4'}/>

            </Picker>
        </View>
    )
}
export default SelectBox;
