import React, { useCallback, useState } from 'react'

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ENDPOINT_partes, ENDPOINT_poliza, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const Vehicle2Form = ({ setLoaded, loaded, setParte, parte, user, handleOnChange, navigation }) => {


    const [vehicles, setVehicles] = useState([]);
    const [poliza, setPoliza] = useState()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [vehicleSec, setVehicleSec] = useState();


    useFocusEffect(
        useCallback(() => {
            fetchVehicle()
            setVehicleSec("")
            setPoliza("")
            setValue("")
        }, []));

    const fetchVehicle = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        console.log(user);
        axios.get(`${ENDPOINT_vehicles}/getVehiclesUserById.php`, {
            params: {
                dni,
                token,
                id: user
            }
        })
            .then(res => {
                const vehicleData = res.data
                console.log(vehicleData);
                if (vehicleData.status) {
                    const vec = vehicleData.vehicles
                    const vehiculosConPoliza = []
                    vec.map(function (item) {
                        if (item.options.poliza_ids.length !== 0) {
                            vehiculosConPoliza.push(item)
                        }
                    })
                    // console.log(vehiculosConPoliza);
                    setVehicles(vehiculosConPoliza)
                } else {
                    console.log("No se pudo obtener los datos de los vehiculos2");
                }
            })
            .catch(error => {
                console.error("Error al obtener los vehiclos de un usuario", error);
            }).finally(() => setLoaded(true))
    }

    const fetchAseguradora = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.get(`${ENDPOINT_poliza}/getByVehiculoID.php`, {
            params: {
                dni,
                token,
                vehiculo_id: value
            }
        })
            .then(res => {
                const polizaData = res.data
                if (polizaData.status) {
                    // console.log(polizaData.poliza);
                    setPoliza(polizaData.poliza)
                } else {
                    // console.log("No se pudo obtener los datos de las polizas");
                }
            })
            .catch(error => {
                console.error("Error al obtener la poliza ", error);
            }).finally(() => setLoaded(true))
    }


    const createParte = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
    }

    // const handleOnChange = (e) => {
    //     const { id, value } = e.target;
    //     setVehicles({ ...vehicles, [id]: value })
    //     setPoliza({ ...poliza, [id]: value })
    // }
    if (!loaded) return <Loader />

    const handleDropDown = () => {
        const itemSelect = vehicles.find(item => item.value === value)
        setVehicleSec(itemSelect)
        fetchAseguradora()
        parte.vehiculo2 = value
        // setParte(parte)
        // console.log(parte);
    }

    console.log(parte);

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


    return (
        <ScrollView >
            <Text style={{ fontSize: 40 }}>Vehiculo B</Text>
            <DropDownPicker
                listMode='MODAL'
                open={open}
                value={value}
                items={vehicles}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setVehicles}
                onChangeValue={handleDropDown}
            />

            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={save}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Enviar Parte</Text>
                </TouchableOpacity>
            </View>
            {vehicleSec &&
                <View style={{ paddingTop: '4%' }}>
                    <TextCustom label={'Matricula'} id={'matricula'} value={vehicleSec.label} onChange={handleOnChange} />
                    <TextCustom label={'Marca'} id={'marca'} value={vehicleSec.options.marca} onChange={handleOnChange} />
                    <TextCustom label={'Modelo'} id={'modelo'} value={vehicleSec.options.modelo} onChange={handleOnChange} />
                </View>
            }
            {poliza &&
                <View >
                    <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} value={poliza.aseguradora_id[1]} onChange={handleOnChange} />
                    <TextCustom label={'Numero de poliza'} id={'name'} value={poliza.name} onChange={handleOnChange} />

                </View>
            }

        </ScrollView>


    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textareaContainer: {
        height: 180,
        backgroundColor: '#fff'
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
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

export default Vehicle2Form