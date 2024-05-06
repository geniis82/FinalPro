import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { ENDPOINT_poliza, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import { Text, View, StyleSheet } from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import DropDownPicker from 'react-native-dropdown-picker';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { setParteOnAsyncStorage } from '../../../../../utils/GeneralFunctions';

import Icon from 'react-native-vector-icons/Ionicons';

const VehicleForm = () => {

    const navigation = useNavigation()

    const [vehicles, setVehicles] = useState([]);
    const [poliza, setPoliza] = useState()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [vehicleSec, setVehicleSec] = useState();
    const [parte, setParte] = useState({})
    const [loaded, setLoaded] = useState(false);


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
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        // console.log(p);
        setParte(storedParte);
        axios.get(`${ENDPOINT_vehicles}/getVehiclesByUser.php`, {
            params: {
                dni,
                token
            }
        })
            .then(res => {
                const vehicleData = res.data
                // console.log(vehicleData);
                if (vehicleData.status) {
                    const vec = vehicleData.vehicles
                    // console.log(vec);
                    const vehiculosConPoliza = []
                    vec.map(function (item) {
                        if (item.options.poliza_ids.length !== 0) {
                            vehiculosConPoliza.push(item)
                        }
                    })
                    setVehicles(vehiculosConPoliza)
                } else {
                    console.log("No se pudo obtener los datos de los vehiculos");
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
        const updatedParte = { ...parte, vehiculo: value };
        setParte(updatedParte);
        fetchAseguradora();
    }

    const handleSiguiente = async () => {
        await setParteOnAsyncStorage(StorageKeys.PARTE, JSON.stringify(parte));
        // console.log(parte);
        navigation.navigate('User2Form');
    };

    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <View>

            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Vehiculo A</Text>
            <ScrollView style={styles.container}>
                <DropDownPicker
                    listMode='SCROLLVIEW'
                    placeholder='Seleccione un vehiculo'
                    placeholderStyle={{ fontSize: 20 }}
                    open={open}
                    value={value}
                    items={vehicles}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setVehicles}
                    onChangeValue={handleDropDown}
                    style={{ marginLeft: '4%', marginTop: '4%', width: '90%' }}
                    dropDownContainerStyle={{ marginLeft: '4%', marginTop: '4%', width: '89.5%' }}
                />
                {vehicleSec  && poliza &&
                <View>
                    <View >
                        <TextCustom label={'Matricula'} id={'matricula'} value={vehicleSec.label} readOnly={true} />
                        <TextCustom label={'Marca'} id={'marca'} value={vehicleSec.options.marca} readOnly={true} />
                        <TextCustom label={'Modelo'} id={'modelo'} value={vehicleSec.options.modelo} readOnly={true} />
                    </View>
                    <View>
                        <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} value={poliza.aseguradora_id[1]} readOnly={true} />
                        <TextCustom label={'Numero de poliza'} id={'name'} value={poliza.name} readOnly={true} />
                    </View>
                </View>
                }
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSiguiente} style={styles.button}>
                    <Icon name='arrow-forward-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        maxHeight: '79%',
        minHeight: '79%',
        marginBottom:'4%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        padding: '4%',
    },
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
    },
});

export default VehicleForm;