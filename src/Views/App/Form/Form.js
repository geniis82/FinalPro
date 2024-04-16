import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import UserForm from './Components/UserForm';
import VehicleForm from './Components/VehicleForm';
import CabeceraForm from './Components/CabeceraForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../utils/StorageKeys';
import axios from 'axios';
import { ENDPOINT_partes } from '../../../../utils/endpoints';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";
import moment from 'moment';
import { createStackNavigator } from '@react-navigation/stack';
import User2Form from './Components/User2Form';
import Vehicle2Form from './Components/Vehicle2Form';

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
            <Stack.Screen name='Cabecera' options={{headerShown:false}} >
                {() => <CabeceraForm />}
            </Stack.Screen>
            <Stack.Screen name='UserForm'  options={{headerShown:false}}>
                {() => <UserForm />}
            </Stack.Screen>
            <Stack.Screen name='VehicleForm' options={{headerShown: false}}>
                {() => <VehicleForm />}
            </Stack.Screen>
            <Stack.Screen name='User2Form' options={{headerShown: false}}>
                {() => <User2Form />}
            </Stack.Screen>
            <Stack.Screen name='Vehicle2Form' options={{headerShown: false}}>
                {() => <Vehicle2Form />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: '4%',
        width: 120,
        backgroundColor: 'green'
    }
});



export default Form;