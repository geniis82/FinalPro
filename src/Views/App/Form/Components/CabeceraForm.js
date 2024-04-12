import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import moment from 'moment'
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { setParteOnAsyncStorage } from '../../../../../utils/GeneralFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';




const CabeceraForm = () => {

    const navigation = useNavigation()

    const [parte, setParte] = useState({})


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const storedParte = await AsyncStorage.getItem(StorageKeys.PARTE);
        if (storedParte) {
            setParte(storedParte);
        }
    };

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setParte({ ...parte, [id]: value })
    }


    const handleSiguiente = async () => {
        await setParteOnAsyncStorage(StorageKeys.PARTE, JSON.stringify(parte));
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        console.log(p);
        navigation.navigate('UserForm');
    };


    return (
        <View>
            <TextCustom label={'Fecha del Parte'} id={'dataParte'} value={moment().format('DD-MM-YYYY')} onChange={handleOnChange} />
            <TextCustom label={'Localidad'} id={'location'} onChange={handleOnChange} value={parte.location} />
            <TextCustom label={'Direccion'} id={'addres'} onChange={handleOnChange} value={parte.addres} />
            <Text>Descripción del accidente</Text>
            <TextCustom
                id={'descripcion'}
                value={parte.descripcion}
                onChange={handleOnChange}
            />
            <TouchableOpacity onPress={handleSiguiente}>
                <Text>Siguiente</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CabeceraForm