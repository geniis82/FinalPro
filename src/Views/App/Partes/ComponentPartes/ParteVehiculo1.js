import React, { useState, useEffect } from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';

import { Text } from 'react-native-elements';
import { ENDPOINT_partes, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';


const ParteVehiculo1 = ({ parte, handleOnChange }) => {

    const [vehicle, setVehicle] = useState({})
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        fetchVehiculo1();
    }, [])

    const fetchVehiculo1 = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI);
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN);

        axios.get(`${ENDPOINT_vehicles}/getVehicleById.php`, {
            params: {
                dni,
                token,
                id: parte.vehiculo[0]
            }
        })
            .then(res => {
                const vehiculo1Data = res.data;
                // console.log(vehiculo1Data);
                if (vehiculo1Data.status) {
                    setVehicle(vehiculo1Data.vehicles)
                } else {
                    console.log("alerta por subnormal");
                }
            })
            .catch(error => {
                console.error("Error al alerta por subnormal partes:", error);
            }).finally(() => setLoaded(true));
    }

    return (
        <View>
            <Text style={{ fontSize: 40 ,marginLeft:'4%'}}>Vehiculo A</Text>
            <TextCustom label={'Matricula'} id={'matricula'} value={vehicle.label} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Marca'} id={'marca'} value={vehicle?.options?.marca} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Modelo'} id={'modelo'} value={vehicle?.options?.modelo} onChange={handleOnChange} readOnly={true} />
        </View>
    )
}

export default ParteVehiculo1