import React, { useEffect, useState } from 'react'
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../utils/StorageKeys';
import axios from 'axios';
import { ENDPOINT_poliza, ENDPOINT_vehicles } from '../../../../utils/endpoints';
import Loader from '../../../Components/Loader';
import { ScrollView } from 'react-native-gesture-handler';
import CabeceraInfoPoliza from './Components/CabeceraPolizasInfo';
import InfoVehiculoPoliza from './Components/InfoVehiculoPoliza';
import InfoAseguradoraPoliza from './Components/InfoAseguradoraPoliza';



const InfoPolizas = () => {

    
    const { params } = useRoute()
    
    const [poliza, setPoliza] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetchPoliza()
    }, [params])

    const fetchPoliza = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.get(`${ENDPOINT_poliza}/getById.php`, {
            params: {
                dni,
                token,
                id: params.id,
            }
        })
            .then(res => {
                const infoPoliza = res.data
                if (infoPoliza.status) {
                    setPoliza(infoPoliza.poliza)
                } else {
                    console.log("no se pudo obtener los datos del usuario");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos del user", error);
            }).finally(() => setLoaded(true))
    }
    
    if (!loaded) return <Loader />

    return(
        <ScrollView>
            <CabeceraInfoPoliza poliza={poliza} />
            <InfoVehiculoPoliza poliza={poliza} />
            <InfoAseguradoraPoliza poliza={poliza} />
        </ScrollView>
    )

}

export default InfoPolizas