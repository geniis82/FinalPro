import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react'
import { StorageKeys } from '../../../../utils/StorageKeys';
import { ENDPOINT_user } from '../../../../utils/endpoints';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg'


const UserQRCode = () => {

    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);


    useFocusEffect(
        useCallback(() => {
            fetchUser()
        }, [])
    );


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
                const usersData = res.data
                if (usersData.status) {
                    setUser(usersData.user)
                } else {
                    console.log('no se pudo obtener los datos de los usuarios2');
                }
            })
            .catch(error => {
                console.error("Error al obtener los usuarios2", error);
            }).finally(() => setLoaded(true))
    }

    return (
        <QRCode
            value={JSON.stringify(user)}
            size={250}
        />
    )

}

export default UserQRCode