import React, { useCallback, useState } from 'react'

import { View, StyleSheet, Alert, Text } from 'react-native';

import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ENDPOINT_partes } from '../../../../../utils/endpoints';
import axios from 'axios';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../../../../Components/Loader';
import OpenCamera from '../../../../../utils/OpenCamera';

const Vehicle2FormNoClient = () => {

    const route = useRoute();
    const { client2 } = route.params;

    const [parte, setParte] = useState({})

    const [vehicle2, setVehcle2] = useState({})
    const [matricula, setMatricula] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [aseguradora, setAseguradora] = useState("");
    const [numPoliza, setNumPoliza] = useState("")
    const [loaded, setLoaded] = useState(false);
    const [imgName, setImgName] = useState("")
    const [poliza_ids, setPoliza_ids] = useState({})

    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            cargarParte()
            setMarca("")
            setMatricula("")
            setModelo("")
            setAseguradora("")
            setNumPoliza("")
        }, []));


    const cargarParte = async () => {
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        setParte({ ...storedParte, ["client2"]: client2 })
        setLoaded(true)
    }

    const save = async () => {
        const updatedParte = { ...parte, client2: client2, vehiculo2: vehicle2, poliza_ids: poliza_ids };
        await AsyncStorage.setItem(StorageKeys.PARTE, JSON.stringify(updatedParte));
        setParte(updatedParte);
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.post(`${ENDPOINT_partes}/save.php`, {
            dni,
            token,
            ...updatedParte,
        })
            .then(res => {
                const parteData = res.data
                // console.log(parteData);
                if (parteData.status) {
                    Alert.alert('Parte Enviado', 'El parte se ha enviado correctamente', [
                        {
                            text: 'Aceptar',
                            onPress: () => navigation.navigate("Mis Partes"),
                            style: 'cancel',
                        },
                    ]);
                } else {
                    Alert.alert('Error', parteData.message, [
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
    };

    const saveFoto = async ({ formData }) => {
        // const p = await AsyncStorage.getItem(StorageKeys.PARTE)
        // const storedParte = JSON.parse(p || '{}');
        // // console.log(p);
        // setParte(storedParte);

        axios.post(
            `${ENDPOINT_partes}/uploadParte.php`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        ).then(res => {
            const imageData = res.data;
            setImgName(imageData['image_url'])
            const updatedParte = { ...parte, photo: imageData['image_url'] };
            setParte(updatedParte);
            // console.log(imageData['image_url']);
        }).catch(error => {
            console.error('Error al subir la imagen:', error);
        });
    }

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setVehcle2({ ...vehicle2, [id]: value })
        // console.log(parte);
    }

    const handlePol = (e) => {
        const { id, value } = e.target;
        setPoliza_ids({ ...poliza_ids, [id]: value })
    }

    const handleGoBack = () => {
        navigation.navigate("User2Form");
    };

    // if (!loaded) return <Loader />

    const handleLib = async ({ result }) => {
        const formData = new FormData();
        formData.append('file', {
            uri: result?.assets[0]?.uri,
            type: result?.assets[0]?.type,
            name: result?.assets[0]?.fileName,
        });
        saveFoto({ formData })
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Vehiculo B</Text>
            <View style={{ paddingTop: '4%' }}>
                <TextCustom label={'Matricula'} id={'matricula'} value={matricula} onChange={handleOnChange} placeholder={'Matricula'} />
                <TextCustom label={'Marca'} id={'marca'} value={marca} onChange={handleOnChange} placeholder={'Marca'} />
                <TextCustom label={'Modelo'} id={'modelo'} value={modelo} onChange={handleOnChange} placeholder={'Modelo'} />
            </View>
            <View >
                <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora'} value={aseguradora} onChange={handlePol} placeholder={'Nombre de la aseguradora'} />
                <TextCustom label={'Numero de poliza'} id={'numPoliza'} value={numPoliza} onChange={handlePol} placeholder={'Numero de poliza'} />
            </View>
            <OpenCamera handleLib={handleLib} />
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
        marginBottom: '10%',

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