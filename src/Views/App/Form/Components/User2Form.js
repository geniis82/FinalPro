import React, { useCallback, useEffect, useState } from 'react'

import { View, StyleSheet, Alert, Switch, PermissionsAndroid } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';
import { ENDPOINT_user } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import { Text } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import User2FormClient from './User2FormClient';
import User2FormNoClient from './User2FormNoClient';



const User2Form = () => {


    const [acceptedPermission, setAcceptedPermissions] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [parte, setParte] = useState({})
    const [users, setUsers] = useState([])
    const [value, setValue] = useState(null);
    const [userSec, setUserSec] = useState({});
    const [user2Id, setUser2ID] = useState({})
    const [search, setSearch] = useState("")
    const [flag, setFlag] = useState("0")

    const [dniScanned, setDniScanned] = useState("")
    const [client2, setClient2] = useState({})
    const [dni, setDni] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [telefono, setTelefono] = useState("");
    const [date, setDate] = useState(new Date())
    const [dateBirth, setDatebirth] = useState("");
    const [email, setEmail] = useState("");

    const navigation = useNavigation();



    useFocusEffect(
        useCallback(() => {
            fetchUser()
            cleanScan()
            // setSearch(dniScanned)
            setValue("")
            setUserSec("")
            setDni("")
            setName("")
            setSurname("")
            setTelefono("")
            setEmail("")
            setDatebirth("")
            setLoaded(true)
        }, [])
    );


    useEffect(() => {
        if (dniScanned) {
            filterUser(dniScanned);
        }
    }, [dniScanned]);


    const cleanScan = async () => {
        await AsyncStorage.removeItem(StorageKeys.DNI_SCANNED)
    }


    const fetchUser = async () => {
        setFlag("0")
        const dniScan = await AsyncStorage.getItem(StorageKeys.DNI_SCANNED)
        setDniScanned(dniScan)
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        setParte(storedParte);

        axios.get(`${ENDPOINT_user}/getAllUsers.php`, {
            params: {
                dni,
                token
            }
        })
            .then(res => {
                const usersData = res.data
                if (usersData.status) {
                    const usersWithOutuser1 = []
                    const vec = usersData.users
                    vec.map(function (item) {
                        if (item.options.dni !== dni) {
                            usersWithOutuser1.push(item)
                        }
                    })
                    setUsers(usersWithOutuser1)
                } else {
                    console.log('no se pudo obtener los datos de los usuarios2');
                }
            })
            .catch(error => {
                console.error("Error al obtener los usuarios2", error);
            }).finally(() => setLoaded(true))
    }


    if (!loaded) return <Loader />

    const handleOnChange = (text) => {
        setSearch(text);
        // setSearch(dniScanned)
    };

    const filterUser = () => {
        if (dniScanned !== null) {
            setSearch(dniScanned);
        }
        const user = users.find((item) => item.options.dni === search);
        if (user === undefined) {
            setFlag('1');
            Alert.alert('Error', 'Usuario no encontrado', [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ]);
        } else {
            setFlag('2');
            setUserSec(user);
            setUser2ID(user.value);
            const updatedParte = { ...parte, client2: user.value };
            setParte(updatedParte);
        }
    };

    const requestCameraPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setAcceptedPermissions(true);
            } else {
                console.log('Permiso denegado');
            }
        } catch (err) {
            console.error('Error al solicitar permisos:', err);
        }
    };


    const scannerQr = async () => {
        await requestCameraPermissions()
        navigation.navigate("QRScann")
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Usuario B</Text>
            <View style={styles.searchBar}>
                <TextInput style={styles.searchInput} value={search} onChangeText={handleOnChange} placeholder={"Buscar dni"} />
                <View style={styles.toggleView}>
                    <TouchableOpacity style={styles.button} onPress={filterUser}>
                        <Icon name='search-circle-sharp' size={48} style={styles.searchButton} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={scannerQr}>
                        <MaterialCommunityIcons name='qrcode-scan' size={40} style={styles.searchButton} />
                    </TouchableOpacity>
                </View>
            </View>
            {+flag === 2 &&
                <User2FormClient userSec={userSec} flag={flag} parte={parte} />
            }
            {+flag === 1 &&
                <User2FormNoClient flag={flag} />
            }
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
    searchInput: {
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        width: '65%'
    },
    searchButton: {
        color: '#9a89c0',
        width: '70%'
    },
    button: {
        // backgroundColor:'blue',
        width: '150%'
    },
    button1: {
        // backgroundColor:'blue',
        width: '150%',
        paddingTop: '8%'
    },
    toggleView: {
        flexDirection: 'row',
        width: '30%',
        // backgroundColor:'yellow',
        justifyContent: 'space-between'

    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        padding: 20,
        borderRadius: 100,
        // backgroundColor: 'green'
    }
});

export default User2Form