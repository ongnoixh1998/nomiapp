import {View, Text, FlatList, StyleSheet, Linking} from "react-native";
import React, {useState} from "react";
import {Button, HStack, Input, Modal, useToast} from "native-base";
import NumberFormat from "react-number-format";
import {useNavigation} from "@react-navigation/native";
import {cancel} from "../../../services/GHNService";

interface GHNItemType {
    data: any,
    onRemove:any,
}

const GHNItem = ({data,onRemove}: GHNItemType) => {
    const navigation = useNavigation();
    const toast = useToast();
    const [showModal, setShowModal] = useState(false)
    const gotoDetail = () => {
       // @ts-ignore
        navigation.navigate("ghndetail",{
            ghnOrder:data.orderCodeGhn
       })
    }
    const getStatusName = (status:any)=>{
        switch (status){
            case "delivering": return "Đang vận chuyển" ;
            case "delivered": return "Đã vận chuyển";
            case "returned": return "Đã hoàn thành";
            case "damage": return "Hàng bị hư" ;
            case "lost": return "Mất hàng" ;
            case "delivery_fail": return "Giao hàng thất bại";
            default:return "GHN nhận hàng";
        }
    }
    const getColor = (status:any)=>{
        switch (status){
            case "delivering": return styles.status_shipping ;
            case "delivered": return styles.status_shipping ;
            case "returned": return styles.status_success;
            case "damage": return styles.status_error ;
            case "lost": return styles.status_error ;
            case "delivery_fail": return styles.status_error;
            default:return styles.status_default;
        }
    }
    const handleCancel = ()=>{
        cancel(data.orderCodeGhn).then((results)=>{
            if (onRemove) onRemove(data.orderCodeGhn)
            setShowModal(false)
            toast.show({
                title:"Thông báo",
                description:'Hủy đơn hàng thành công',
                status:'success',
                placement:'top'
            })
        })

    }
    const track = ()=>{
        Linking.openURL("https://donhang.ghn.vn/?order_code="+data.orderCodeGhn).then((results)=>{

        })
    }
    return (
        <View style={{...styles.contaier}}>
            <View style={{...styles.row, flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{...styles.row}}>
                    <Text style={{...styles.fontBold}}>Mã đơn hàng:</Text>
                    <Text style={{...styles.ml5, ...styles.fontBold}}>{data.orderCodeGhn}</Text>
                </View>
                <View>
                    <Text style={{...styles.fontBold,...getColor(data.status), padding: 5, borderRadius: 10}}>{getStatusName(data.status)}</Text>
                </View>
            </View>
            <View style={{...styles.row}}>
                <Text style={{...styles.fontBold}}>Tên SP:</Text>
                <Text
                    style={{...styles.ml5, ...styles.fontBold, ...styles.textPrimary}}>{data.productName ? data.productName : 'Chưa có tên'}</Text>
            </View>
            <View style={{...styles.row}}>
                <Text style={{...styles.fontBold}}>Họ và tên:</Text>
                <Text style={{...styles.ml5, ...styles.fontBold, ...styles.textPrimary}}>{data.name}</Text>
            </View>
            <View style={{...styles.row}}>
                <Text style={{...styles.fontBold}}>Số điện thoại:</Text>
                <Text style={{...styles.ml5, ...styles.fontBold, ...styles.textPrimary}}>{data.phoneNumber}</Text>
            </View>
            <View style={{...styles.row}}>
                <Text style={{...styles.fontBold}}>GT đơn hàng:</Text>
                <NumberFormat displayType={'text'}
                              value={data.amount}
                              thousandSeparator={true}
                              suffix={' đ'}
                              renderText={(text) => <Text style={{...styles.ml5, ...styles.fontBold}}>{text}</Text>}/>

            </View>
            <View style={{...styles.row}}>
                <Text style={{...styles.fontBold}}>COD:</Text>
                <NumberFormat displayType={'text'}
                              value={data.cod}
                              thousandSeparator={true}
                              suffix={' đ'}
                              renderText={(text) => <Text style={{...styles.ml5, ...styles.fontBold}}>{text}</Text>}/>
            </View>
            <HStack style={{...styles.row, flexDirection: "row", justifyContent: "flex-end"}} space={'3'}>
                <Button onPress={()=>setShowModal(true)} backgroundColor={'red.500'}>Hủy</Button>
                <Button onPress={gotoDetail}>Xem chi tiết</Button>
                <Button onPress={track} backgroundColor={'purple.600'} >Tra cứu</Button>
            </HStack>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Header>Thông báo</Modal.Header>
                    <Modal.Body>
                        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,color:"#fd0000"}}>Bạn có muốn hủy đơn hàng này không</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            flex="1"
                            onPress={handleCancel}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    contaier: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10
    },
    row: {
        display: "flex",
        flexDirection: "row",
        letterSpacing: 10,
        paddingTop: 5,
        paddingBottom: 5

    },
    fontBold: {
        fontWeight: "bold"
    },
    ml5: {
        marginLeft: 5
    },
    textPrimary: {
        color: "#7703ff"
    },
    status_success:{
        backgroundColor:"#0fb803",
        color:"#fff"
    },
    status_error:{
        backgroundColor:"#db2303",
        color:"#fff"
    },
    status_shipping:{
        backgroundColor:"#f17200",
        color:"#fff"
    },
    status_default:{
        backgroundColor:"#188eee",
        color:"#fff"
    },
})
export default GHNItem
