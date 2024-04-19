import React, { useCallback, useEffect, useState } from 'react'

import { View, StyleSheet, Alert, Switch, Text } from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';



const User2FormClient = ({ userSec }) => {
    console.log(userSec);
    return (
        <View>
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
                <TextCustom label={'Nombre'} id={'name'} value={userSec ? userSec.options.name : ''} placeholder={"Introduzca nombre"} readOnly={true} />
                <TextCustom label={'Apellidos'} id={'surname'} value={userSec ? userSec.options.surname : ''} placeholder={"Introduzca apellidos"} readOnly={true} />
                <TextCustom label={'Telefono'} id={'phone'} value={userSec ? userSec.options.tlf : ''} placeholder={"Introduzca telefono"} readOnly={true} />
                <TextCustom label={'Fecha de Nacimiento'} id={'dateBirth'} value={userSec ? userSec.options.dateBirth : ''} placeholder={"Introduzca fecha de nacimiento"} readOnly={true} />
                <TextCustom label={'Correo Electronico'} id={'email'} value={userSec ? userSec.options.email : ''} placeholder={"Introduzca correo electronico"} readOnly={true} />
            </View>
        </View>
    )
}
export default User2FormClient

const styles = StyleSheet.create({
    button: {
        padding: '4%',
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
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        padding: '3%',
        borderRadius: 100
    }
});
