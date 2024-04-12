import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { ENDPOINT_user } from '../../../../../utils/endpoints';
import { Text, View } from 'react-native';
import axios from 'axios';
import TextCustom from '../../../../Components/TextCustom';
import Loader from '../../../../Components/Loader';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const UserForm = () => {
    // const [storedParte,setStoredParte]=useState({});
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState({});
    const [parte, setParte] = useState({})


    const navigation = useNavigation()

    useEffect(() => {
        fetchUser();
    }, [])

    

    const fetchUser = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        const p = await AsyncStorage.getItem(StorageKeys.PARTE)
        setParte(p)


        axios.get(`${ENDPOINT_user}/getUser.php`, {
            params: {
                dni,
                token
            }
        })
            .then(res => {
                const userData = res.data
                // console.log({userData});
                if (userData.status) {
                    setUser(userData.user)
                    // parte.client1=userData.user.id
                    // setParte({ ...parte })
                    // console.log(parte);
                } else {
                    console.log("no se pudo obtener los datos del usuario");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos del user", error);
            }).finally(() => setLoaded(true))
    }


    const handleSiguiente = async () => {
        await AsyncStorage.setItem(StorageKeys.PARTE, JSON.stringify(parte));

        let par=await AsyncStorage.getItem(StorageKeys.PARTE)
        const parteFormated=JSON.parse(par)
        console.log(parteFormated);
        navigation.navigate('VehicleForm');
    };

    if (!loaded) return <Loader />
    return (
        <ScrollView>
            <Text style={{ fontSize: 40 }}>Usuario A</Text>

            <TextCustom label={'Name'} id={'name'} value={user.name} />
            <TextCustom label={'Surname'} id={'surname'} value={user.surname} />
            <TextCustom label={'Phone'} id={'tlf'} value={user.tlf} />
            <TextCustom label={'Date Birth'} id={'dateBirth'} value={user.dateBirth} />
            <TextCustom label={'Email'} id={'email'} value={user.email} />
            <TouchableOpacity onPress={handleSiguiente}>
                <Text>Siguiente</Text>
            </TouchableOpacity>
        </ScrollView >
    )
}

export default UserForm;