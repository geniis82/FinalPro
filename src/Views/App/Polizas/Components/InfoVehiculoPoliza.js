import React, { useCallback, useEffect, useState } from 'react'
import { ENDPOINT_vehicles } from '../../../../../utils/endpoints'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';
import Loader from '../../../../Components/Loader';

import { useFocusEffect } from "@react-navigation/native";


const InfoVehiculoPoliza = ({ poliza, handleOnchange }) => {

    const [vehicle, setVehicle] = useState({})
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        fetchPoliza();
    }, [poliza])

    const fetchPoliza = async () => {

        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        // console.log(poliza);

        axios.get(`${ENDPOINT_vehicles}/getVehicleById.php`, {
            params: {
                dni,
                token,
                id: poliza.vehiculo_id[0],
            }
        })
            .then(res => {
                const infoVehi = res.data
                if (infoVehi.status) {
                    console.log(infoVehi.vehicles);
                    setVehicle(infoVehi.vehicles)
                } else {
                    console.log("no se pudo obtener los datos del usuario");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos del user", error);
            }).finally(() => setLoaded(true))
    }

    if (!loaded) return <Loader />

    return (
        <View>
            <TextCustom label={'Matricula'} id={'label'} value={vehicle.label} onChange={handleOnchange} readOnly={true} />
            <TextCustom label={'Marca'} id={'marca'} value={vehicle.options.marca} onChange={handleOnchange} readOnly={true} />
            <TextCustom label={'Modelo'} id={'modelo'} value={vehicle.options.modelo} onChange={handleOnchange} readOnly={true} />
        </View>
    )

}

export default InfoVehiculoPoliza