import React, { useCallback, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Alert, Text } from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINT_partes, ENDPOINT_poliza, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

const Vehicle2FormClient = () => {

    const route = useRoute();
    const { user2Id } = route.params;

    const navigation = useNavigation()

    const [loaded, setLoaded] = useState(false);

    const [vehicles, setVehicles] = useState([]);
    const [poliza, setPoliza] = useState()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [vehicleSec, setVehicleSec] = useState();
    const [parte, setParte] = useState({})

    const handleDropDown = () => {
        const itemSelect = vehicles.find(item => item.value === value)
        setVehicleSec(itemSelect)
        fetchAseguradora()
        parte.vehiculo2 = value
    }

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
        setParte(storedParte)
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

    const save = async () => {
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

        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Vehiculo B</Text>
            <DropDownPicker
                listMode='SCROLLVIEW'
                placeholder='Seleccione un vehiculo'
                open={open}
                value={value}
                items={vehicles}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setVehicles}
                onChangeValue={handleDropDown}
                style={{ marginLeft: '4%', marginTop: '4%', flex: 1, width: '90%' }}
                dropDownContainerStyle={{ marginLeft: '4%', marginTop: '4%', width: '89.5%' }}
            />

            {vehicleSec &&
                <View>
                    <View style={{ paddingTop: '4%' }}>
                        <TextCustom label={'Matricula'} id={'matricula'} value={vehicleSec.label} />
                        <TextCustom label={'Marca'} id={'marca'} value={vehicleSec.options.marca} />
                        <TextCustom label={'Modelo'} id={'modelo'} value={vehicleSec.options.modelo} />
                    </View>
                    {poliza &&

                        <View>
                            <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} value={poliza.aseguradora_id[1]} />
                            <TextCustom label={'Numero de poliza'} id={'name'} value={poliza.name} />
                        </View>
                    }
                    {!poliza &&

                        <View >
                            <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} />
                            <TextCustom label={'Numero de poliza'} id={'name'} />
                        </View>

                    }
                </View>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={save} style={styles.button}>
                    <Icon name='send' size={55} style={styles.textButton} />
                </TouchableOpacity>
            </View>
        </ScrollView >
    )

}

export default Vehicle2FormClient

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