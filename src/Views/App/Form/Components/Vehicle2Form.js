import React, { useCallback, useState } from 'react'

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ENDPOINT_partes, ENDPOINT_poliza, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Vehicle2FormClient from './Vehicle2FormClient';
import Vehicle2FormNoClient from './Vehicle2FormNoClient';
import Vehicle2FormNoClientNotNew from './Vehicle2FormNoClientNotNew';


const Vehicle2Form = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { client2 } = route.params;
    const { userSec } = route.params;
    const { flag } = route.params

    const [loaded, setLoaded] = useState(true);

    const save = async () => {
        let updatedParte = ({});
        if (vehicleSec === undefined) {
            updatedParte = { ...parte, vehiculo2: vehicle2, poliza_ids: poliza_ids };
        } else {
            updatedParte = { ...parte, vehiculo2: vehicleSec.value, poliza_ids: poliza_ids };
        }
        await AsyncStorage.setItem(StorageKeys.PARTE, JSON.stringify(updatedParte));
        setParte(updatedParte);
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.post(`${ENDPOINT_partes}/save.php`, {
            dni,
            token,
            ...updatedParte,
        })
            .then(res => {
                const parteData = res.data
                // console.log(parteData);
                if (parteData.status) {
                    Alert.alert('Parte Enviado', 'El parte se ha enviado correctamente', [
                        {
                            text: 'Aceptar',
                            onPress: () => navigation.navigate("Mis Partes"),
                            style: 'cancel',
                        },
                    ]);
                } else {
                    Alert.alert('Error', parteData.message, [
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
    };

    const handleGoBack = () => {
        navigation.navigate("User2Form");
    };

    if (!loaded) return <Loader />


    return (
        <View style={{height:'100%'}}>
            {+flag === 2 &&
                <Vehicle2FormClient />
            }
            {+flag === 1 &&
                <Vehicle2FormNoClient />
            }
            {+flag === 3 &&
                <Vehicle2FormNoClientNotNew />
            }
        </View>
    )

}

export default Vehicle2Form
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height:'10%'
    },
    button: {
        padding: '4%',
    },
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
        marginBottom:'6%'
    },
});