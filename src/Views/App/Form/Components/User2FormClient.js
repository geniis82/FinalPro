import React, { useCallback, useEffect, useState } from 'react'

import { View, StyleSheet, Alert, Switch, Text } from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';



const User2FormClient = ({ userSec,flag,parte }) => {

    const navigation = useNavigation()

    const handleSiguiente = async () => {
        await AsyncStorage.setItem(StorageKeys.PARTE,JSON.stringify(parte))
        navigation.navigate('Vehicle2Form',{userSec,flag});
    }

    const handleGoBack = async () => {
        await AsyncStorage.removeItem(StorageKeys.DNI_SCANNED)
        navigation.goBack();
    };
    return (
        <ScrollView>
            <View style={styles.searchBar}>
                <Text style={{ fontSize: 16 }}>Pertenece a la Gestoria?</Text>
                <Switch
                    trackColor={{ false: '#cdcdcd', true: '#cdcdcd' }}
                    thumbColor={userSec.options.isClient ? '#cfd965' : '#9a89c0'}
                    ios_backgroundColor="#3e3e3e"
                    value={userSec.options.isClient}
                />
            </View>
            <View >
                <TextCustom label={'Nombre'} id={'name'} value={userSec ? userSec.options.name : ''} placeholder={"Introduzca nombre"} readOnly={true} style={styles.input}/>
                <TextCustom label={'Apellidos'} id={'surname'} value={userSec ? userSec.options.surname : ''} placeholder={"Introduzca apellidos"} readOnly={true} style={styles.input}/>
                <TextCustom label={'Telefono'} id={'phone'} value={userSec ? userSec.options.tlf : ''} placeholder={"Introduzca telefono"} readOnly={true} style={styles.input}/>
                <TextCustom label={'Fecha de Nacimiento'} id={'dateBirth'} value={userSec ? userSec.options.dateBirth : ''} placeholder={"Introduzca fecha de nacimiento"} readOnly={true} style={styles.input}/>
                <TextCustom label={'Correo Electronico'} id={'email'} value={userSec ? userSec.options.email : ''} placeholder={"Introduzca correo electronico"} readOnly={true} style={styles.input}/>
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
export default User2FormClient

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
    },
    input: {
        // marginTop: '2%',
        fontSize:20,
        marginLeft: '3%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        marginRight:'5%',
        // textAlignVertical: 'top',
    }
});
