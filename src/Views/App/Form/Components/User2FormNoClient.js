import React, { useCallback, useEffect, useState } from 'react'

import { View, StyleSheet, Alert, Switch } from 'react-native';
import { Button, Text } from 'react-native-elements';
import TextCustom from '../../../../Components/TextCustom';

import DatePicker from 'react-native-date-picker'
import moment from 'moment'


const User2FormNoClient = ({ handleOnChangeNoUser }) => {


    const [open, setOpen] = useState(false)
    const [client, setClient] = useState({})
    const [dni, setDni] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [telefono, setTelefono] = useState("");
    const [date, setDate] = useState(new Date())
    const [dateBirth, setDatebirth] = useState("");
    const [email, setEmail] = useState("");

    return (
        <View >
            <View style={styles.searchBar}>
                <Text style={{ fontSize: 16 }}>Pertenece a la Gestoria?</Text>
                <Switch
                    trackColor={{ false: '#cdcdcd', true: '#cdcdcd' }}
                    thumbColor={false ? '#cfd965' : '#9a89c0'}
                    ios_backgroundColor="#3e3e3e"
                    value={false}
                />
            </View>
            <TextCustom label={'Dni'} id={'dni'} value={dni} placeholder={"Introduzca nombre"} onChange={handleOnChangeNoUser} />
            <TextCustom label={'Nombre'} id={'name'} value={name} placeholder={"Introduzca nombre"} onChange={handleOnChangeNoUser} />
            <TextCustom label={'Apellidos'} id={'surname'} value={surname} placeholder={"Introduzca apellidos"} onChange={handleOnChangeNoUser} />
            <TextCustom label={'Telefono'} id={'phone'} value={telefono} placeholder={"Introduzca telefono"} onChange={handleOnChangeNoUser} keyboardType={'numeric'} />
            <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                mode='date'
                open={open}
                date={date}
                // id='dateBirth'
                // onDateChange={handleOnChange}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setDatebirth(moment(date).format('YYYY-MM-DD'))
                    handleOnChangeNoUser
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <TextCustom label={'Fecha de Nacimiento'} id={'dateBirth'} value={dateBirth } placeholder={"Introduzca fecha de nacimiento"} onChange={handleOnChangeNoUser} />
            <TextCustom label={'Correo Electronico'} id={'email'} value={email} placeholder={"Introduzca correo electronico"} onChange={handleOnChangeNoUser} />
        </View>
    )
}
export default User2FormNoClient

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
