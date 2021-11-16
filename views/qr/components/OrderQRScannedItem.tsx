
import {Button, Divider, Stack, Text, Modal, VStack, HStack, Input} from "native-base";
import React, {memo, useEffect, useState} from "react";
import {StyleSheet, TextInput, View} from "react-native";
import NumberFormat from "react-number-format";
import {receivePackage} from "../../../services/OrderService";
import {useNavigation} from "@react-navigation/native";
interface OrderQRScannedItemType {
    data:any,
    onChangeValue?:any
}
const OrderQRScannedItem = ({data,onChangeValue}:OrderQRScannedItemType)=>{
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false)
    const [packageReceived,setPackageReceived] = useState<any>(0)

    useEffect(()=>{
        setPackageReceived(data.countPackage?data.countPackage:0);
    },[])
    const getStatusName = (status:string)=>{
        let statusName = "Chưa nhận hàng";
        switch (status) {
            case "received":statusName =  "Đã nhận hàng";break;
            case "dilivered": statusName= "Đã tạo đơn GHN";break
            default: statusName= "Chưa nhận hàng";
        }9
        statusName+=" ("+(data.packageReceived?data.packageReceived:0)+"/"+(data.countPackage?data.countPackage:0)+")"
        return statusName;
    }
    const getColor = (status:string) => {
        switch (status) {
            case "received":return {backgroundColor: "#13f305", color: "#484848"}
            case "dilivered": return {backgroundColor: "#f5811f", color: "#303030"}
            default:return {backgroundColor: "#7607f6", color: "#f6f6f6"}
        }
    }
    const handleCreateGHN = ()=>{
        // @ts-ignore
        navigation.navigate("ghndetail",{
            id:data.id
        });
    }
    const toggleModal = ()=>{
        setShowModal(!showModal);
    }
    const handleGet = ()=>{
        receivePackage(data.trackingId,packageReceived).then((results)=>{
            if (results.success){
                onChangeValue('viStatusCode','received',data.trackingId,packageReceived)
            }else {

            }
            toggleModal()
        })
    }
    const gotoTrackingOrderScreen = ()=>{
        console.log(data);
        // @ts-ignore
        navigation.navigate("trackingorder",{
            id:data.id
        });
    }
    const renderModal = ()=>{
        return(
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Header>Số kiện nhận</Modal.Header>
                    <Modal.Body>
                        <VStack space={3}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontWeight="medium">Số kiện</Text>

                                <Input borderWidth={0}
                                       value={packageReceived.toString()}
                                       keyboardType={'numeric'}
                                       onChangeText={(text)=>setPackageReceived(text)}
                                       placeholder={'số kiện'}/>
                            </HStack>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            flex="1"
                            onPress={handleGet}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        )
    }
    return(
        <View style={{backgroundColor:"#fff",borderRadius:10,padding:10}}>
            <Text style={styles.fontBold}>
                Tên SP:
                <Text style={{...styles.fontBold,color:"#9702f3"}}>{data.productName}</Text>
            </Text>
           <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
               <Text style={styles.fontBold}>Đơn hàng:{data.id}</Text>
               <Text style={{...getColor(data.viStatusCode),padding:5,borderRadius:10,fontWeight:"bold"}}>{getStatusName(data.viStatusCode)}</Text>
           </View>
            <Text style={styles.fontBold}>
                Tên khách:
                <Text style={{...styles.fontBold,color:"#9702f3"}}>{data.fullName}</Text>
            </Text>

            <Text style={styles.fontBold}>
                SDT:
                <Text style={{...styles.fontBold,color:"#9702f3"}}> {data.phoneNumber}</Text>

            </Text>
            <Text style={styles.fontBold}>
                <Text style={styles.fontBold}>Tiền hàng:</Text>
                <NumberFormat value={data.productAmount}
                              displayType={'text'}
                              suffix={" đ"}
                              renderText={(text)=><Text style={{...styles.fontBold,color:"#f33f09"}}>{text}</Text>}
                              thousandSeparator={true}/>
            </Text>
            <Text >
                <Text style={styles.fontBold}>Tổng hóa đơn:</Text>
                <NumberFormat value={data.orderAmount}
                              displayType={'text'}
                              suffix={" đ"}
                              renderText={(text)=><Text style={{...styles.fontBold,color:"#f33f09"}}>{text}</Text>}
                              thousandSeparator={true}/>
            </Text>
            <Text style={styles.fontBold}>Địa chỉ:{data.fullAddress}</Text>
            <Divider my="2" />
           <Stack justifyContent={'flex-end'} direction={'row'}  space={3}>
               <Button backgroundColor={'purple.500'}
                       onPress={gotoTrackingOrderScreen}>Xem tất cả TTVC</Button>
               {
                   data.viStatusCode?
                   <Button color={'amber.200'}
                           onPress={toggleModal} >Đã nhận hàng</Button> :
                   <Button backgroundColor={'amber.400'}
                           onPress={toggleModal}>Nhận hàng</Button>
               }

               <Button backgroundColor={'purple.500'}
                       onPress={handleCreateGHN}>Tạo GHN</Button>
           </Stack>
            {renderModal()}
        </View>
    )
}
const styles = StyleSheet.create({
    fontBold:{
        fontWeight:'bold'
    }
})
export default memo(OrderQRScannedItem)
