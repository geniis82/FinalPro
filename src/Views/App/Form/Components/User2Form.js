import React, { useCallback, useEffect, useState } from 'react'

import { View, StyleSheet, Alert, Switch } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';
import { ENDPOINT_user } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import DropDownPicker from 'react-native-dropdown-picker';
import { SearchBar, Text } from 'react-native-elements';
import TextCustom from '../../../../Components/TextCustom';
import Vehicle2Form from './Vehicle2Form';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';



const User2Form = () => {

    const [loaded, setLoaded] = useState(false);
    const [parte, setParte] = useState({})
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [userSec, setUserSec] = useState({});
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [user2Id, setUser2ID] = useState({})
    const [search, setSearch] = useState("")

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


    // const handleDropDown = () => {
    //     const itemSelect = users.find(item => item.value === value)
    //     setUserSec(itemSelect)
    //     const updatedParte = { ...parte, client2: value };
    //     setUser2ID(value)
    //     setParte(updatedParte);
    //     console.log(parte);
    // }

    const handleSiguiente = async () => {
        await AsyncStorage.setItem(StorageKeys.PARTE, JSON.stringify(parte));
        console.log(parte);
        console.log(user2Id);
        navigation.navigate('Vehicle2Form', { user2Id });
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleOnChange = (text) => {
        setSearch(text);
    };

    const filterUser = () => {
        const user = users.find(item => item.options.dni === search);
        // console.log(user);
        if (user === undefined) {
            Alert.alert('Error', 'El usuario introducido no es valido'), [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
            ]
        } else {
            setUserSec(user)
            setUser2ID(user.value)
            const updatedParte = { ...parte, client2: user.value };
            setParte(updatedParte);
        }
    }
    const cleanFields = (value) => {
        setUserSec(null)
        setUser2ID({})
        const updatedParte = { ...parte, client2: user2Id };
        setParte(updatedParte);
        if (!value) {
            setToggleCheckBox(value)
            // setUserSec({})
        } else {
            setSearch('')
            // setUserSec(null)
            setToggleCheckBox(value)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Usuario B</Text>
            <View style={styles.toggleView}>
                <Switch
                    trackColor={{ false: '#cdcdcd', true: '#cdcdcd' }}
                    thumbColor={toggleCheckBox ? '#cfd965' : '#9a89c0'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(newValue) => cleanFields(newValue)}
                    value={toggleCheckBox}
                />
                <Text style={{ fontSize: 16 }}>Pertenece a la Gestoria?</Text>
            </View>


            {toggleCheckBox &&
                <View style={styles.searchBar}>
                    <TextInput style={styles.searchInput} value={search} onChangeText={handleOnChange} placeholder={"Buscar dni"} />
                    {/* <TextCustom style value={search} id={'dniBus'} onChange={handleOnChange} placeholder={"Buscar dni"} /> */}
                    <TouchableOpacity style={styles.button} onPress={filterUser}>
                        <Icon name='search-circle-sharp' size={45} style={styles.searchButton} />
                    </TouchableOpacity>
                </View>
            }
            <View >
                <TextCustom label={'Nombre'} id={'name'} value={userSec ? userSec.options.name : ''} placeholder={"Introduzca nombre"} readOnly={toggleCheckBox} />
                <TextCustom label={'Apellidos'} id={'surname'} value={userSec ? userSec.options.surname : ''} placeholder={"Introduzca apellidos"} readOnly={toggleCheckBox} />
                <TextCustom label={'Telefono'} id={'phone'} value={userSec ? userSec.options.tlf : ''} placeholder={"Introduzca telefono"} readOnly={toggleCheckBox} />
                <TextCustom label={'Fecha de Nacimiento'} id={'dateBirth'} value={userSec ? userSec.options.dateBirth : ''} placeholder={"Introduzca fecha de nacimiento"} readOnly={toggleCheckBox} />
                <TextCustom label={'Correo Electronico'} id={'email'} value={userSec ? userSec.options.email : ''} placeholder={"Introduzca correo electronico"} readOnly={toggleCheckBox} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSiguiente} style={styles.button}>
                    <Icon name='arrow-forward-circle' size={55} style={styles.textButton} />
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
    searchInput: {
        marginLeft: '3%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        width: '80%'
    },
    searchButton: {
        color: '#9a89c0',
        width: '70%'
    },
    toggleView: {
        flexDirection: 'row',
        margin: '4%',

    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        padding: '3%',
        borderRadius: 100
    }
});

export default User2Form