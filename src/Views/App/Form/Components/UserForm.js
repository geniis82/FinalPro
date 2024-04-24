import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { ENDPOINT_user } from '../../../../../utils/endpoints';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import TextCustom from '../../../../Components/TextCustom';
import Loader from '../../../../Components/Loader';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';


const UserForm = () => {
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
        const storedParte = JSON.parse(p || '{}');
        // console.log(p);
        setParte(storedParte);
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
                    // const updatedParte = { ...storedParte, client1: userData.user.id ,...parte};
                    const updatedParte = { ...storedParte, client1: userData.user.id };
                    setParte(updatedParte);
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
        // console.log(parte);
        navigation.navigate('VehicleForm');
    };
    const handleGoBack = () => {
        navigation.goBack();
    };

    if (!loaded) return <Loader />
    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Usuario A</Text>

            <TextCustom label={'Nombre'} id={'name'} value={user.name}  readOnly={true} />
            <TextCustom label={'Apellidos'} id={'surname'} value={user.surname}  readOnly={true} />
            <TextCustom label={'Telefono'} id={'tlf'} value={user.tlf}  readOnly={true} />
            <TextCustom label={'Fecha de nacimiento'} id={'dateBirth'} value={moment(user.dateBirth).format("DD-MM-YYYY")} readOnly={true}  />
            <TextCustom label={'Correo Electronico'} id={'email'} value={user.email}  readOnly={true} />
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
        </ScrollView >
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
    input: {
        // marginTop: '2%',
        fontSize: 20,
        marginLeft: '3%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        marginRight: '5%',
        // textAlignVertical: 'top',
    }

});

export default UserForm;