import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState, memo} from "react";

interface NumnberPickerType {
    isOpen?: boolean,
    onChangeValue?: any,
    defaultValue?:string
}

const NumberPickerDialog = ({isOpen,onChangeValue,defaultValue}: NumnberPickerType) => {
    const [modalVisible, setModalVisible] = useState<boolean>(isOpen ? isOpen : false);
    const [value, setValue] = useState('');
    const [prevIsOpen, setPrevIsOpen] = useState<boolean>(false);
    useEffect(()=>{
        setValue(defaultValue?defaultValue:'');

    },[defaultValue])
    useEffect(() => {
        if (prevIsOpen && !isOpen){
            setModalVisible(true);
        }else if (prevIsOpen && isOpen){
            setModalVisible(true);
        }else if (!prevIsOpen && isOpen){
            setModalVisible(true);
        }else {
            setModalVisible(false);
        }

    }, [isOpen])
    const listElement = () => {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'Xóa']
    }
    const onPress = (text: any) => {
        if (text === 'Xóa') {

            setValue(prevState => {
                const strState = String(prevState);
                let newState = strState.slice(0, -1);
                return newState
            })
        } else {
            setValue((prevValue) => {
                return prevValue + text;
            })
        }
    }
    const toggle = () => {
        if (isOpen) {
            setPrevIsOpen(isOpen);
        }
        setModalVisible(!modalVisible);
    }
    const confirm = ()=>{
        toggle();
        if (onChangeValue){
            onChangeValue(value?value:'0');
            setValue('')
        }
    }
    const formatValue = ()=>{
        const valueInt = parseInt(value?value:'0')
        let re = '\\d(?=(\\d{' + (0 || 3) + '})+' + (0 > 0 ? '\\.' : '$') + ')';

        return (valueInt).toFixed(Math.max(0, ~~0) ).replace(new RegExp(re, 'g'), '$&,');
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
            <View style={{...styles.body, backgroundColor: "#00000080"}}>
                <View style={styles.container}>
                    <Text style={{fontWeight: "bold", fontSize: 25, textAlign: "center"}}></Text>
                    <View style={styles.header}>

                        <Text style={{fontWeight: "bold", fontSize: 25}}>{formatValue()}</Text>
                    </View>
                    <View style={styles.row}>
                        {listElement().map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onLongPress={() => onPress(item)}
                                                  onPress={() => onPress(item)} style={styles.column}>
                                    <View>
                                        <Text style={{fontWeight: "bold"}}>{item}</Text>
                                    </View>
                                </TouchableOpacity>

                            )
                        })}
                    </View>
                    <View style={{flexDirection: "row", paddingLeft: 20, paddingRight: 20}}>
                        <View style={{flex: 1, margin: 10}}>
                            <Button title={'Thoát'} onPress={toggle}/>
                        </View>
                        <View style={{flex: 1, margin: 10}}>
                            <Button title={'Xác nhận'} onPress={confirm}/>
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    container: {
        width: 300,
        backgroundColor: "#fff",
        overflow: "hidden",
        borderRadius: 5,
    },
    header: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#cdcccc50",
        padding: 10

    },
    row: {

        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    },
    column: {
        width: '30%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#9d9b9b",
        margin: 2,
        height: 50,
        borderRadius: 10,
        overflow: "hidden"
    }
})
export default memo(NumberPickerDialog)
