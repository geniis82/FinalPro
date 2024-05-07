import React, { useCallback, useEffect, useState } from 'react'

import { View, StyleSheet, Alert, Switch, TextInput } from 'react-native';
import { Button, Text } from 'react-native-elements';
import TextCustom from '../../../../Components/TextCustom';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';


const User2FormNoClient = ({ handleDateChange,handleOnChangeNoUser,dateBirth}) => {

    // const navigation = useNavigation()
    const [open, setOpen] = useState(false);
    const [dni, setDni] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

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
            <TextCustom label={'Telefono'} id={'phone'} value={telefono} placeholder={"Introduzca telefono"} onChange={handleOnChangeNoUser} keyboardType={'numeric'} maxLength={9} />
            <View>
                <DatePicker
                    modal
                    title={"Seleccione fecha"}
                    confirmText='Confirmar'
                    cancelText='Cancelar'
                    buttonColor={'#9a89c0'}
                    mode="date"
                    open={open}
                    date={new Date()}
                    onConfirm={handleDateChange}
                    onCancel={() => setOpen(false)}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: '1%' }}>
                    <View>
                        <Text style={styles.textLabel}>Fecha de Nacimiento</Text>
                        <TextInput style={styles.input} id={'dateBirth'} placeholder={"Seleccione fecha"} readOnly={true}>{moment(dateBirth).format("DD-MM-YYYY")}</TextInput>
                    </View>
                    {/* <TextCustom label={'Fecha de Nacimiento'} id={'dateBirth'} value={moment(dateBirth).format("DD-MM-YYYY")} placeholder={"Seleccione fecha"} readOnly={true} /> */}
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Icon name='calendar' size={45} style={styles.textButtonCal} />
                    </TouchableOpacity>
                </View>
            </View>
            <TextCustom label={'Correo Electronico'} id={'email'} value={email} placeholder={"Introduzca correo electronico"} onChange={handleOnChangeNoUser} />
        </View>
    )
}
export default User2FormNoClient

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        padding: '4%',
    },
    textButtonCal: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '56%',
        // backgroundColor:'blue',
        marginRight: '7%',
        width: '60%'
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
        // padding: '3%',
        paddingLeft: '3%',
        paddingRight: '3%',
        borderRadius: 100
    },
    input: {
        backgroundColor: 'red',
        width: '75%'
    },
    inputCalendar: {
        fontSize: 20,
        marginLeft: '6%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        marginRight: '5%',
        width: '130%'
    },
    textLabel: {
        fontSize: 22,
        marginLeft: '5%',
        marginTop: '4%'
    },
    input: {
        marginTop: '2%',
        fontSize:20,
        marginLeft: '3%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        marginRight:'5%',
        // textAlignVertical: 'top',
        width:'130%'
    }
});
