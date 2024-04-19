import React, { useCallback, useEffect, useState } from 'react'

import { View, StyleSheet, Alert, Text } from 'react-native';

import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ENDPOINT_partes } from '../../../../../utils/endpoints';
import axios from 'axios';

const Vehicle2FormNoClient = ({ handleGoBack, client2 }) => {

    const [parte, setParte] = useState({})

    const [vehicle2, setVehcle2] = useState({})
    const [matricula, setMatricula] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [aseguradora, setAseguradora] = useState("");
    const [numPoliza, setNumPoliza] = useState("")
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        cargarParte()
    },[])


    const cargarParte = async () => {
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        setParte(storedParte)
        
        setLoaded(true)
    }

    const save = async () => {
        const updatedParte = { ...parte, client2: client2, vehiculo2: vehicle2 };
        setParte(updatedParte);
        await AsyncStorage.setItem(StorageKeys.PARTE, JSON.stringify(parte));
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.post(`${ENDPOINT_partes}/save.php`, {
            dni,
            token,
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
        setVehcle2({ ...vehicle2, [id]: value })
        console.log(parte);
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Vehiculo B</Text>
            <View style={{ paddingTop: '4%' }}>
                <TextCustom label={'Matricula'} id={'matricula'} value={matricula} onChange={handleOnChange} />
                <TextCustom label={'Marca'} id={'marca'} value={marca} onChange={handleOnChange} />
                <TextCustom label={'Modelo'} id={'modelo'} value={modelo} onChange={handleOnChange} />
            </View>
            <View >
                <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora'} value={aseguradora} onChange={handleOnChange} />
                <TextCustom label={'Numero de poliza'} id={'numPoliza'} value={numPoliza} onChange={handleOnChange} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={save} style={styles.button}>
                    <Icon name='send' size={55} style={styles.textButton} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

}

export default Vehicle2FormNoClient

const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '6%',
        marginBottom: '25%',

    },
    button: {
        padding: '4%',

    },
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '5%',
    },

});