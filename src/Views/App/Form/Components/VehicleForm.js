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
import User2Form from './User2Form';
import Vehicle2Form from './Vehicle2Form';
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


    // useEffect(() => {
    //     fetchVehicle()
    // }, [])

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
        console.log(p);
        setParte(storedParte);
        // setParte(p)

        axios.get(`${ENDPOINT_vehicles}/getVehiclesByUser.php`, {
            params: {
                dni,
                token
            }
        })
            .then(res => {
                const vehicleData = res.data
                if (vehicleData.status) {
                    const vec = vehicleData.vehicles
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

    // const handleOnChange = (e) => {
    //     const { id, value } = e.target;
    //     setVehicles({ ...vehicles, [id]: value })
    //     setPoliza({ ...poliza, [id]: value })
    // }
    if (!loaded) return <Loader />

    const handleDropDown = () => {
        const itemSelect = vehicles.find(item => item.value === value)
        setVehicleSec(itemSelect)
        const updatedParte = { ...parte, vehiculo: value };
        setParte(updatedParte);
        fetchAseguradora()
        console.log(parte);
    }

    const handleSiguiente = async () => {
        await setParteOnAsyncStorage(StorageKeys.PARTE, JSON.stringify(parte));
        console.log(parte);
        navigation.navigate('User2Form');
    };

    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Vehiculo A</Text>
            <DropDownPicker
                listMode='MODAL'
                open={open}
                value={value}
                items={vehicles}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setVehicles}
                onChangeValue={handleDropDown}
                style={{ marginLeft: '4%', marginTop: '4%', flex: 1, width: '90%' }}
            />

            {vehicleSec &&
                <View style={{ paddingTop: '4%' }}>
                    <TextCustom label={'Matricula'} id={'matricula'} value={vehicleSec.label} />
                    <TextCustom label={'Marca'} id={'marca'} value={vehicleSec.options.marca} />
                    <TextCustom label={'Modelo'} id={'modelo'} value={vehicleSec.options.modelo} />
                </View>
            }
            {poliza &&
                <View>
                    <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} value={poliza.aseguradora_id[1]} />
                    <TextCustom label={'Numero de poliza'} id={'name'} value={poliza.name} />
                    {/* <User2Form setLoaded={setLoaded} loaded={loaded} parte={parte} setParte={setParte} handleOnChange={handleOnChange} /> */}
                </View>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                    {/* <Text style={styles.textButton}>Atras</Text> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSiguiente} style={styles.button}>
                    <Icon name='arrow-forward-circle' size={55} style={styles.textButton} />
                    {/* <Text style={styles.textButton}>Siguiente</Text> */}
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        marginTop: '5%'
    },

});

export default VehicleForm;