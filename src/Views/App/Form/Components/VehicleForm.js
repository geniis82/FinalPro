import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { ENDPOINT_poliza, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import { View } from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import DropDownPicker from 'react-native-dropdown-picker';
import { StorageKeys } from '../../../../../utils/StorageKeys';


import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';

const VehicleForm = ({ setLoaded, loaded }) => {


    const [vehicles, setVehicles] = useState([]);
    const [poliza, setPoliza] = useState()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [vehicleSec, setVehicleSec] = useState();

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

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setVehicles({ ...vehicles, [id]: value })
        setPoliza({ ...poliza, [id]: value })
    }
    if (!loaded) return <Loader />

    const handleDropDown = () => {
        const itemSelect = vehicles.find(item => item.value === value)
        setVehicleSec(itemSelect)
        fetchAseguradora()
    }

    return (
        <View >
            <DropDownPicker
                listMode='SCROLLVIEW'
                open={open}
                value={value}
                items={vehicles}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setVehicles}
                onChangeValue={handleDropDown}
            />

            {vehicleSec &&
                <View style={{ paddingTop: '4%' }}>
                    <TextCustom label={'Matricula'} id={'matricula'} value={vehicleSec.label} onChange={handleOnChange} />
                    <TextCustom label={'Marca'} id={'marca'} value={vehicleSec.options.marca} onChange={handleOnChange} />
                    <TextCustom label={'Modelo'} id={'modelo'} value={vehicleSec.options.modelo} onChange={handleOnChange} />
                </View>
            }
            {poliza &&
                <View style={{ paddingBottom: '4%' }}>
                    <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} value={poliza.aseguradora_id[1]} onChange={handleOnChange} />
                    <TextCustom label={'Numero de poliza'} id={'name'} value={poliza.name} onChange={handleOnChange} />
                </View>
            }
        </View>
    )


}

export default VehicleForm;