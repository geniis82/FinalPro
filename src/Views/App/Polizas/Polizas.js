import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useState } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, TouchableOpacity } from "react-native";
import { StorageKeys } from '../../../../utils/StorageKeys'
import axios from 'axios'
import { ENDPOINT_poliza } from '../../../../utils/endpoints'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Paths } from '../../../../utils/paths';
import { createStackNavigator } from '@react-navigation/stack';
import ListaPoliza from './ListaPolizas';
import InfoPolizas from './InfoPolizas';

const Polizas = () => {
    const Stack= createStackNavigator();
    const navigation= useNavigation()

    useFocusEffect(
        useCallback(()=>{
            navigation.navigate("ListaPoliza");
        },[navigation.isFocused()])
    )

    return(
        <Stack.Navigator>
            <Stack.Screen name="ListaPoliza" options={{headerShown:false}}>
                {()=><ListaPoliza/>}
            </Stack.Screen>
            <Stack.Screen name="Informacion de la Poliza" >
                {()=> <InfoPolizas/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default Polizas