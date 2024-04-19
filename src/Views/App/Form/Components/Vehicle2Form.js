import React, { useCallback, useState } from 'react'

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ENDPOINT_partes, ENDPOINT_poliza, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Vehicle2FormClient from './Vehicle2FormClient';
import Vehicle2FormNoClient from './Vehicle2FormNoClient';


const Vehicle2Form = () => {

    const route = useRoute();
    const { user2Id } = route.params;
    const { flag1 } = route.params;
    const { client2 } = route.params;

    const navigation = useNavigation()

    const [loaded, setLoaded] = useState(false);

    const [vehicles, setVehicles] = useState([]);
    const [poliza, setPoliza] = useState()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [vehicleSec, setVehicleSec] = useState();
    const [parte, setParte] = useState({})

    const [vehicle2, setVehcle2] = useState({})



    useFocusEffect(
        useCallback(() => {
            if (flag1) {
                fetchVehicle()
            } else {
                cargarParte()
            }
            setVehicleSec("")
            setPoliza("")
            setValue("")
            setVehcle2({})
            console.log(parte);
        }, []));


    
    const cargarParte = async () => {
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        // console.log(p);
        // console.log(user2Id);
        setParte({...storedParte, ["client2"]: client2})
        // setVehcle2({ ...vehicle2, [id]: value })
        setLoaded(true)
    }

    const fetchVehicle = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        // console.log(p);
        // console.log(user2Id);
        setParte(storedParte)
        // console.log(user2Id);
        axios.get(`${ENDPOINT_vehicles}/getVehiclesUserById.php`, {
            params: {
                dni,
                token,
                id: user2Id
            }
        })
            .then(res => {
                const vehicleData = res.data
                console.log(vehicleData);
                if (vehicleData.status) {
                    const vec = vehicleData.vehicles
                    // const vehiculosConPoliza = []
                    // vec.map(function (item) {
                    //     if (item.options.poliza_ids.length !== 0) {
                    //         vehiculosConPoliza.push(item)
                    //     }
                    // })
                    // console.log(vehiculosConPoliza);
                    setVehicles(vec)
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

    if (!loaded) return <Loader />

    const handleDropDown = () => {
        const itemSelect = vehicles.find(item => item.value === value)
        setVehicleSec(itemSelect)
        fetchAseguradora()
        parte.vehiculo2 = value
        // setParte(parte)
        // console.log(parte);
    }

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setVehcle2({ ...vehicle2, [id]: value })
        // console.log(vehicle2);
    }


    const save = async () => {
        if (!flag1) {
            console.log(client2);
            console.log(vehicle2);
            const updatedParte = { ...parte, client2: client2, vehiculo2: vehicle2 };
            console.log(updatedParte);
            setParte(updatedParte);
            await AsyncStorage.setItem(StorageKeys.PARTE, JSON.stringify(parte));
        }
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

    const handleGoBack = () => {
        navigation.navigate("User2Form");
    };


    return (
        <View>
            {flag1 ?
                <Vehicle2FormClient
                    handleDropDown={handleDropDown}
                    handleGoBack={handleGoBack}
                    open={open}
                    poliza={poliza}
                    save={save}
                    setOpen={setOpen}
                    setValue={setValue}
                    setVehicles={setVehicles}
                    value={value}
                    vehicleSec={vehicleSec}
                    vehicles={vehicles}
                />
                :
                <Vehicle2FormNoClient
                    handleGoBack={handleGoBack}
                    client2={client2}
                />
            }
        </View>
    )

}

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

export default Vehicle2Form