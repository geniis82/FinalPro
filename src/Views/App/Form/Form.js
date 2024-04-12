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

    const dni = AsyncStorage.getItem(StorageKeys.USER_DNI)
    const token = AsyncStorage.getItem(StorageKeys.USER_TOKEN)
    const idUser = AsyncStorage.getItem(StorageKeys.USER_ID)



    const [loaded, setLoaded] = useState(false);
    const [showFirstScreen, setShowFirstScreen] = useState(true);
    const navigation = useNavigation()
    // const [parte, setParte] = useState({
    //     dataParte: "",
    //     location: "",
    //     addres: "",
    //     descripcion: "",
    //     client1: "",
    //     vehiculo: "",
    //     client2: "",
    //     vehiculo2: "",
    // })

    useFocusEffect(
        useCallback(() => {
            // cleanParte()
            navigation.navigate("Cabecera");
        }, [navigation.isFocused()]))

    useEffect(() => {
        // cleanParte()
    })

    const cleanParte = async () => {
        await AsyncStorage.removeItem(StorageKeys.PARTE)
    }


    const save = async () => {

        axios.post(`${ENDPOINT_partes}/save.php`, {
            ...parte
        })
            .then(res => {
                const parteData = res.data
                console.log(parteData);
                if (parteData.status) {
                    Alert.alert('Parte Eniado', 'El parte se ha enviado correctamente', [
                        {
                            text: 'Aceptar',
                            onPress: () => navigation.navigate("Mis Partes"),
                            style: 'cancel',
                        },
                    ]);
                } else {
                    Alert.alert('Error', 'Introduzca todos los campos', [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                    ]);
                }
            })
            .catch(error => {
                console.error("error al crear parte", error);
            }).finally(() => setLoaded(true))
    }


    // const handleOnChange = (e) => {
    //     const { id, value } = e.target;
    //     setParte({ ...parte, [id]: value })
    // }

    return (
        <Stack.Navigator>
            <Stack.Screen name='Cabecera' >
                {() => <CabeceraForm />}
            </Stack.Screen>
            <Stack.Screen name='UserForm'  >
                {() => <UserForm />}
            </Stack.Screen>
            <Stack.Screen name='VehicleForm' >
                {() => <VehicleForm />}
            </Stack.Screen>
            <Stack.Screen name='User2Form' >
                {() => <User2Form />}
            </Stack.Screen>
            <Stack.Screen name='Vehicle2Form' >
                {() => <Vehicle2Form />}
            </Stack.Screen>


            {/* <ScrollView style={{ padding: '4%' }}>
                    <Text style={{ fontSize: 40 }}>Parte</Text>
                    <UserForm setLoaded={setLoaded} loaded={loaded} setParte={setParte} parte={parte} handleOnChange={handleOnChange} />
                    <VehicleForm setLoaded={setLoaded} loaded={loaded} setParte={setParte} parte={parte} handleOnChange={handleOnChange} />
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={save}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Enviar Parte</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView> */}
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