import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { ENDPOINT_user } from '../../../../../utils/endpoints';
import { Text, View } from 'react-native';
import axios from 'axios';
import TextCustom from '../../../../Components/TextCustom';
import Loader from '../../../../Components/Loader';
import { StorageKeys } from '../../../../../utils/StorageKeys';


const UserForm = ({ setLoaded, loaded, setParte, parte ,handleOnChange}) => {


    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)

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
                    parte.client1=userData.user.id
                    // setParte(parte)
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
            <Text style={{ fontSize: 40 }}>Usuario A</Text>
            <TextCustom label={'Name'} id={'name'} value={user.name} onChange={handleOnChange} />
            <TextCustom label={'Surname'} id={'surname'} value={user.surname} onChange={handleOnChange} />
            <TextCustom label={'Phone'} id={'tlf'} value={user.tlf} onChange={handleOnChange} />
            <TextCustom label={'Date Birth'} id={'dateBirth'} value={user.dateBirth} onChange={handleOnChange} />
            <TextCustom label={'Email'} id={'email'} value={user.email} onChange={handleOnChange} />
        </View>
    )
}

export default UserForm;