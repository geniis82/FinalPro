import React, { useCallback, useState } from 'react'

import { View, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';
import { ENDPOINT_user } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text } from 'react-native-elements';
import TextCustom from '../../../../Components/TextCustom';
import Vehicle2Form from './Vehicle2Form';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';



const User2Form = () => {

    const [loaded, setLoaded] = useState(false);
    const [parte, setParte] = useState({})
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [userSec, setUserSec] = useState();
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [user2Id, setUser2ID] = useState({})

    const navigation = useNavigation()

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

        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        console.log(p);
        setParte(storedParte);

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
        const updatedParte = { ...parte, client2: value };
        setUser2ID(value)
        setParte(updatedParte);
        console.log(parte);
    }

    const handleSiguiente = async () => {
        await AsyncStorage.setItem(StorageKeys.PARTE, JSON.stringify(parte));
        console.log(parte);
        console.log(user2Id);
        navigation.navigate('Vehicle2Form', { user2Id });
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Usuario B</Text>
            <View>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text >Do you like React Native?</Text>
            </View>

            {toggleCheckBox &&
                <DropDownPicker
                    listMode='MODAL'
                    open={open}
                    value={value}
                    items={users}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setUsers}
                    onChangeValue={handleDropDown}
                    style={{ marginLeft: '4%', marginTop: '4%', flex: 1, width: '90%' }}
                />
            }

            {userSec &&
                <View style={{ paddingTop: '4%' }}>
                    <TextCustom label={'Name'} id={'name'} value={userSec.options.name} />
                    <TextCustom label={'Surname'} id={'surname'} value={userSec.options.surname} />
                    <TextCustom label={'Phone'} id={'phone'} value={userSec.options.tlf} />
                    <TextCustom label={'Date Birth'} id={'dateBirth'} value={userSec.options.dateBirth} />
                    <TextCustom label={'Email'} id={'email'} value={userSec.options.email} />
                    {/* <Vehicle2Form setLoaded={setLoaded} loaded={loaded} user={userSec} parte={parte} setParte={setParte} handleOnChange={handleOnChange} /> */}
                </View>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                    {/* <Text style={styles.textButton}>Atras</Text> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSiguiente} style={styles.button}>
                    <Icon name='arrow-forward-circle' size={55} style={styles.textButton} />
                    {/* <Text style={styles.textButton}>Siguiente</Text> */}
                </TouchableOpacity>
            </View>
        </ScrollView>

    )

}
const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '6%',
        marginBottom: '25%',

    },
    button: {
        padding: '4%',

    },
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '5%',
    },

});

export default User2Form