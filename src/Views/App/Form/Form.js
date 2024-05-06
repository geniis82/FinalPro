import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import CabeceraForm from './Components/CabeceraForm';
import User2Form from './Components/User2Form';
import UserForm from './Components/UserForm';
import Vehicle2Form from './Components/Vehicle2Form';
import VehicleForm from './Components/VehicleForm';
import QRScann from './Components/QRScann';
import OpenCamera from '../../../../utils/OpenCamera';

const Form = () => {
    const Stack = createStackNavigator();
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            navigation.navigate("Cabecera");
        }, [navigation.isFocused()])
    )

    
    return (
        <Stack.Navigator>
            <Stack.Screen name='Cabecera' options={{ headerShown: false }} >
                {() => <CabeceraForm />}
            </Stack.Screen>
            <Stack.Screen name='UserForm' options={{ headerShown: false }}>
                {() => <UserForm />}
            </Stack.Screen>
            <Stack.Screen name='VehicleForm' options={{ headerShown: false }}>
                {() => <VehicleForm />}
            </Stack.Screen>
            <Stack.Screen name='User2Form' options={{ headerShown: false }}>
                {() => <User2Form />}
            </Stack.Screen>
            <Stack.Screen name='QRScann' options={{ headerShown: false }}>
                {() => <QRScann />}
            </Stack.Screen>
            <Stack.Screen name='Vehicle2Form' options={{ headerShown: false }}>
                {() => <Vehicle2Form />}
            </Stack.Screen>
            <Stack.Screen name='OpenCamera' options={{ headerShown: false }}>
                {() => <OpenCamera />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}


export default Form;