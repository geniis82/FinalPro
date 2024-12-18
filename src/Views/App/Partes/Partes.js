import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StorageKeys } from "../../../../utils/StorageKeys";
import { Paths } from "../../../../utils/paths";
import { StackView, createStackNavigator } from "@react-navigation/stack";
import { ENDPOINT_partes, ENDPOINT_user } from "../../../../utils/endpoints";
import ListaPartes from "./ListaPartes";
import InfoPartes from "./InfoPartes";
import ExportPdf from "../ExportPdf/ExportPdf";
import Form from "../Form/Form";



const Partes = () => {

    const Stack= createStackNavigator();
    const navigation= useNavigation()

    useFocusEffect(
        useCallback(()=>{
            navigation.navigate("ListaPartes");
        },[navigation.isFocused()])
    )

    return(
        <Stack.Navigator>
            <Stack.Screen name="ExportPdf"options={{headerShown:false}}>
                {()=><ExportPdf/>}
            </Stack.Screen>
            <Stack.Screen name="ListaPartes" options={{headerShown:false}} >
                {()=><ListaPartes/>}
            </Stack.Screen>
            <Stack.Screen name="Informacion del Parte" >
                {()=> <InfoPartes/> }
            </Stack.Screen>
            <Stack.Screen name="Nuevo Parte" >
                {()=> <Form/> }
            </Stack.Screen>
        </Stack.Navigator>
    )

}

export default Partes