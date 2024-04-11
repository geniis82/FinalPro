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
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";
import moment from 'moment';

const Form = () => {

    const dni = AsyncStorage.getItem(StorageKeys.USER_DNI)
    const token = AsyncStorage.getItem(StorageKeys.USER_TOKEN)
    const idUser = AsyncStorage.getItem(StorageKeys.USER_ID)

    const [loaded, setLoaded] = useState(false);
    const navigation = useNavigation()
    const [parte, setParte] = useState({
        dataParte: "",
        location: "",
        addres: "",
        descripcion: "",
        client1: "",
        vehiculo: "",
        client2: "",
        vehiculo2: "",
    })

    // useFocusEffect(
    //     useCallback( () => {
    //         setParte({
    //             dataParte: moment().format('YYYY-MM-DD'),
    //             location: "",
    //             addres: "",
    //             descripcion: "",
    //             client1: idUser,
    //             vehiculo: "",
    //             client2: "",
    //             vehiculo2: "",
    //         })
    //     }, []));

    // useEffect(async () => {
    //     return () => {
    //         setParte({
    //             client1: idUser,
    //         })
    //     }
    // }, [])


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


    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setParte({ ...parte, [id]: value })
    }

    return (
        <ScrollView style={{ padding: '4%' }}>
            <Text style={{ fontSize: 40 }}>Parte</Text>
            <CabeceraForm setLoaded={setLoaded} loaded={loaded} setParte={setParte} parte={parte} handleOnChange={handleOnChange} />
            <UserForm setLoaded={setLoaded} loaded={loaded} setParte={setParte} parte={parte} handleOnChange={handleOnChange} />
            <VehicleForm setLoaded={setLoaded} loaded={loaded} setParte={setParte} parte={parte} handleOnChange={handleOnChange} />
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={save}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Enviar Parte</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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