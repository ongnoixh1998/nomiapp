import React from "react";
import { VStack, HStack, Button, IconButton, Text, NativeBaseProvider, Center, Box, StatusBar, Icon } from "native-base";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function AppBar(){
    return (
        <>
            <Box safeAreaTop backgroundColor="#6200ee" />
            <HStack bg='#6200ee' px="1" py="3" justifyContent='space-between' alignItems='center'>
                <HStack space="4" alignItems='center'>
                    <IconButton icon={<Icon size="sm" as={<FontAwesome5 name='menu' />} color="white" />} />
                    <Text color="white" fontSize="20" fontWeight='bold'>Home</Text>
                </HStack>
                <HStack space="2">
                    <IconButton icon={<Icon as={<FontAwesome5 name='favorite' />} size='sm' color="white" />} />
                    <IconButton icon={<Icon as={<FontAwesome5 name='search' />}
                                            color="white" size='sm'  />} />
                    <IconButton icon={<Icon as={<FontAwesome5 name='more-vert' />} size='sm' color="white" />} />
                </HStack>
            </HStack>

        </>
    )
}
