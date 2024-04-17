import React ,{useState,useEffect} from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import { Text } from 'react-native-elements';
import { ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';


const ParteVehiculo2 = ({parte,handleOnChange}) => {


    const [vehicle, setVehicle] = useState({})
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        fetchVehiculo2();
    }, [])

    const fetchVehiculo2 = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI);
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN);

        axios.get(`${ENDPOINT_vehicles}/getVehicleById.php`, {
            params: {
                dni,
                token,
                id: parte.vehiculo2[0]
            }
        })
            .then(res => {
                const vehiculo2Data = res.data;
                // console.log(vehiculo1Data);
                if (vehiculo2Data.status) {
                    setVehicle(vehiculo2Data.vehicles)
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
            <Text style={{ fontSize: 40 ,marginLeft:'4%'}}>Vehiculo B</Text>
            <TextCustom label={'Matricula'} id={'matricula2'} value={vehicle.label} onChange={handleOnChange} readOnly={true}/>
            <TextCustom label={'Marca'} id={'marca2'} value={vehicle?.options?.marca} onChange={handleOnChange} readOnly={true}/>
            <TextCustom label={'Modelo'} id={'modelo2'} value={vehicle?.options?.modelo} onChange={handleOnChange} readOnly={true}/>
            <TextCustom label={'Nombre Propietario'} id={'nameCliente2'} value={parte.client2[1].split(" - ").pop(-1)} onChange={handleOnChange} readOnly={true}/>
        </View>
    )
}

export default ParteVehiculo2