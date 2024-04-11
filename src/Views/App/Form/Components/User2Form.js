import React, { useCallback, useState } from 'react'

import { View } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';
import { ENDPOINT_user } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text } from 'react-native-elements';
import TextCustom from '../../../../Components/TextCustom';
import Vehicle2Form from './Vehicle2Form';


const User2Form = ({ setLoaded, loaded, setParte, parte ,handleOnChange}) => {


    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [userSec, setUserSec] = useState();


    useFocusEffect(
        useCallback(() => {
            fetchUser()
            setValue("")
            setUserSec("")
        }, [])
    );

    const fetchUser = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)

        axios.get(`${ENDPOINT_user}/getAllUsers.php`, {
            params: {
                dni,
                token
            }
        })
            .then(res => {
                const usersData = res.data
                // console.log(usersData);
                if (usersData.status) {
                    const usersWithOutuser1 = []
                    const vec = usersData.users
                    vec.map(function (item) {
                        if (item.options.dni !== dni) {
                            usersWithOutuser1.push(item)
                        }
                    })
                    setUsers(usersWithOutuser1)
                    // console.log(usersWithOutuser1);
                } else {
                    console.log('no se pudo obtener los datos de los usuarios2');
                }
            })
            .catch(error => {
                console.error("Error al obtener los usuarios2", error);
            }).finally(() => setLoaded(true))
    }




    if (!loaded) return <Loader />


    const handleDropDown = () => {
        const itemSelect = users.find(item => item.value === value)
        setUserSec(itemSelect)
        parte.client2=value
        // setParte(parte)
        console.log(parte);
    }

    return (
        <View style={{ paddingBottom: '4%' }}>
            <Text style={{ fontSize: 40 }}>Usuario B</Text>
            <DropDownPicker
                listMode='SCROLLVIEW'
                open={open}
                value={value}
                items={users}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setUsers}
                onChangeValue={handleDropDown}
                
            />
            {userSec &&
                <View style={{ paddingTop: '4%' }}>
                    <TextCustom label={'Name'} id={'name'} value={userSec.options.name} onChange={handleOnChange} />
                    <TextCustom label={'Surname'} id={'surname'} value={userSec.options.surname} onChange={handleOnChange} />
                    <TextCustom label={'Phone'} id={'phone'} value={userSec.options.tlf} onChange={handleOnChange} />
                    <TextCustom label={'Date Birth'} id={'dateBirth'} value={userSec.options.dateBirth} onChange={handleOnChange} />
                    <TextCustom label={'Email'} id={'email'} value={userSec.options.email} onChange={handleOnChange} />
                    <Vehicle2Form setLoaded={setLoaded} loaded={loaded} user={userSec} parte={parte} setParte={setParte} handleOnChange={handleOnChange}/>
                </View>
            }
        </View>
    )


}

export default User2Form