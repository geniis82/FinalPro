import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Alert,
    Text
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { ENDPOINT_user } from '../../../../../utils/endpoints';
import axios from 'axios';
import Loader from '../../../../Components/Loader';



const CambiarContraseña = () => {
    const navigation = useNavigation()
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [reNewPass, setReNewPass] = useState();
    const [disabled, setDisbled] = useState(false)

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
                if (userData.status) {
                    setUser(userData.user)
                } else {
                    console.log("no se pudo obtener los datos del usuario");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos del user", error);
            }).finally(() => setLoaded(true))
    }




    const handleGoBack = () => {
        navigation.goBack();
    };

    const alertGuradar = () =>
        Alert.alert('Guardar', 'Estas seguro de guardar los cambios?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            { text: 'OK', onPress: () => handleGuardar() },
        ]);

    const handleGuardar = async () => {
        const idUser = await AsyncStorage.getItem(StorageKeys.USER_ID)
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.post(`${ENDPOINT_user}/setNewPassword.php`, {
            dni,
            token,
            id: idUser,
            oldPassword,
            newPassword,
        })
            .then(res => {
                const userData = res.data
                // console.log(userData);
                if (userData.status) {
                    Alert.alert('Gurdado', "Su contraseña ha sido modificada", [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                    ]);
                    setUser(userData.user)
                    navigation.goBack();
                } else {
                    Alert.alert('Error', JSON.stringify(userData.message), [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                    ]);
                    console.log("no se pudo actualizar los datos  usuario");
                }
            })
            .catch(error => {
                console.error("Error al actualizar los datos del user", error);
            }).finally(() => setLoaded(true))
    };

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        if (id === 'antPass') {
            setOldPassword(value);
        } else if (id === 'newPass') {
            setNewPassword(value);
        } else if (id === 'reNewPass') {
            setReNewPass(value);
        }
    }

    if (!loaded) return <Loader />
    return (
        <ScrollView style={styles.container}>
            <TextCustom label={'Contraseña antigua'} id={'antPass'} value={oldPassword} onChange={handleOnChange} secureTextEntry={true} />
            <TextCustom label={'Nueva Contraseña'} id={'newPass'} value={newPassword} onChange={handleOnChange} secureTextEntry={true} />
            <TextCustom label={'Repita Nueva Contraseña'} id={'reNewPass'} value={reNewPass} onChange={handleOnChange} secureTextEntry={true} />
            {newPassword !== reNewPass &&
                <Text style={{ marginLeft: '7%', color: 'red' }}>Las contraseñas deben coincidir</Text>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back' size={55} style={styles.textButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={alertGuradar} style={styles.button} >
                    <Icon name='save-outline' size={55} style={styles.textButton} />
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
        color: '#cfd948',
        marginTop: '5%'
    },

});

export default CambiarContraseña