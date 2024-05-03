import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from "axios";
import { Button } from 'react-native-elements';
import { getItemFromAsyncStorage, setItemOnAsyncStorage } from '../../../../utils/GeneralFunctions';
import { StorageKeys } from '../../../../utils/StorageKeys';
import Loader from '../../../Components/Loader';
import { ENDPOINT_auth, ENDPOINT_user } from '../../../../utils/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ navigation }) => {
    const { reset } = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        handleCheckToken();
    }, [])

    const handleCheckToken = async () => {
        const token = await getItemFromAsyncStorage(StorageKeys.USER_TOKEN)
        const dni = await getItemFromAsyncStorage(StorageKeys.USER_DNI)
        // console.log(token);
        if (token !== null) {
            axios.post(`${ENDPOINT_auth}/checkToken.php`, {
                token
            })
                .then(res => {
                    if (res.status) {
                        reset({ index: 0, routes: [{ name: 'App' }] });
                    }
                })
        } else {
            setLoaded(true)
        }
    }

    const handleLogin = async () => {
        axios.post(`${ENDPOINT_auth}/login.php`, {
            email: username,
            password,
        })
            .then(async res => {
                let userInfo = res.data;
                if (userInfo.status) {
                    // console.log(userInfo);
                    await setItemOnAsyncStorage(StorageKeys.USER_TOKEN, userInfo.token)
                    await setItemOnAsyncStorage(StorageKeys.USER_DNI, username)
                    await setItemOnAsyncStorage(StorageKeys.USER_ID, userInfo.id)
                    reset({ index: 0, routes: [{ name: 'App' }] });
                } else {
                    Alert.alert('Error', JSON.stringify(userInfo.message))
                }
            })
            .catch(e => {
                console.log({ e });
            })
    };


    if (!loaded) return <Loader />

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={username}
                    placeholder="Enter username"
                    onChangeText={text => setUsername(text)}
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter password"
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <TouchableOpacity onPress={handleLogin} style={styles.buttom}>
                    <Text style={{textAlign:'center', fontWeight:'bold'}}>LOGIN</Text>
                </TouchableOpacity>
                

                {/* <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.link}>Register</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 30,
        paddingHorizontal: 14,
        
    },
    buttom:{
        marginBottom: 12,
        borderRadius: 100,
        paddingHorizontal: 14,
        backgroundColor: '#cfd948',
        alignContent:'space-between',
        padding:'4%',
        width:'90%',
        marginLeft:'5%'
    },
});

export default Login;