import React, { useCallback, useEffect, useState } from 'react'

import { View, StyleSheet, Alert, Switch } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';
import { ENDPOINT_user } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import { Button, Text } from 'react-native-elements';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import User2FormClient from './User2FormClient';
import User2FormNoClient from './User2FormNoClient';



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
    const [flag, setFlag] = useState("0")
    const [flag1, setFlag1] = useState(false)
    const [user, setUser] = useState({})

    const [client2, setClient2] = useState({})
    const [dni, setDni] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [telefono, setTelefono] = useState("");
    const [date, setDate] = useState(new Date())
    const [dateBirth, setDatebirth] = useState("");
    const [email, setEmail] = useState("");


    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            fetchUser()
            // setClient2({})
            setValue("")
            setUserSec("")
            setDni("")
            setName("")
            setSurname("")
            setTelefono("")
            setEmail("")
            setDatebirth("")
        }, [])
    );


    const fetchUser = async () => {
        setFlag("0")
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        // console.log(p);
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


    const handleSiguiente = async () => {
        console.log(flag);
        if (+flag === 2) {
            await AsyncStorage.setItem(StorageKeys.PARTE, JSON.stringify(parte));
            navigation.navigate('Vehicle2Form', { user2Id, flag1: true });
        } else {
            console.log(client2);
            navigation.navigate('Vehicle2Form', { user2Id, toggleCheckBox, client2 });
        }
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleOnChange = (text) => {
        setSearch(text);
    };

    const handleOnChangeNoUser = (e) => {
        const { id, value } = e.target;
        setClient2({ ...client2, [id]: value })
        // console.log(client2);
    }

    const filterUser = () => {
        const user = users.find(item => item.options.dni === search);
        console.log(user);

        if (user === undefined) {
            setFlag("1")
            Alert.alert('Error', 'Usuario no encontrado'), [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
            ]
        } else {
            setFlag("2")
            setUserSec(user)
            setUser2ID(user.value)
            const updatedParte = { ...parte, client2: user.value };
            setParte(updatedParte);
        }
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Usuario B</Text>
            <View style={styles.searchBar}>
                <TextInput style={styles.searchInput} value={search} onChangeText={handleOnChange} placeholder={"Buscar dni"} />
                <TouchableOpacity style={styles.button} onPress={filterUser}>
                    <Icon name='search-circle-sharp' size={45} style={styles.searchButton} />
                </TouchableOpacity>
            </View>
            {+flag === 2 &&
                <View>
                    <User2FormClient handleOnChange={handleOnChange} userSec={userSec} search={search} filterUser={filterUser} />
                </View>
            }
            {+flag === 1 &&
                <User2FormNoClient handleOnChangeNoUser={handleOnChangeNoUser} />
            }

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