import React, { useState, useEffect } from 'react'

import CabeceraInfoPartes from './ComponentPartes/CabeceraInfoPartes'
import ParteVehiculo1 from './ComponentPartes/ParteVehiculo1';
import { ScrollView } from 'react-native-gesture-handler';
import ParteVehiculo2 from './ComponentPartes/ParteVehiculo2';
import { useRoute } from "@react-navigation/native";

import axios from 'axios';
import Loader from '../../../Components/Loader';
import { ENDPOINT_partes } from '../../../../utils/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../utils/StorageKeys';

const InfoPartes = () => {

    const { params } = useRoute()
    const [parte, setParte] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchParte();
    }, [params])

    const fetchParte = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.get(`${ENDPOINT_partes}/getById.php`, {
            params: {
                dni,
                token,
                id: params.id,
            }
        })
            .then(res => {
                const infoParte = res.data
                // console.log(infoParte);
                if (infoParte.status) {
                    setParte(infoParte.parte)
                } else {
                    console.log("no se pudo obtener los datos del usuario");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos del user", error);
            }).finally(() => setLoaded(true))
    }

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setParte({ ...parte, [id]: value })
    }
    if (!loaded) return <Loader />

    return (
        <ScrollView>
            <CabeceraInfoPartes parte={parte} handleOnChange={handleOnChange} />
            <ParteVehiculo1 parte={parte} handleOnChange={handleOnChange} />
            <ParteVehiculo2 parte={parte} handleOnChange={handleOnChange} />
        </ScrollView>
    )
}

export default InfoPartes