import React, { useCallback, useEffect, useState } from 'react'

import { View, StyleSheet, Alert, Switch } from 'react-native';
import { Button, Text } from 'react-native-elements';
import TextCustom from '../../../../Components/TextCustom';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';


const User2FormNoClient = ({ flag }) => {

    const navigation = useNavigation()
    const [open, setOpen] = useState(false);
    const [dni, setDni] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dateBirth, setDatebirth] = useState('');
    const [email, setEmail] = useState('');
    const [client2, setClient2] = useState({});

    const handleOnChangeNoUser = (e) => {
        const { id, value } = e.target;
        setClient2({ ...client2, [id]: value })
    }

    const handleDateChange = (date) => {
        setOpen(false);
        setDatebirth(moment(date).format('YYYY-MM-DD'));
        setClient2({ ...client2, dateBirth: moment(date).format('YYYY-MM-DD') });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSiguiente = async () => {
        navigation.navigate('Vehicle2Form', { client2, flag });
    }

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
            <View >
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
                <View style={{ flexDirection: 'row' ,justifyContent:'space-between'}}>
                    <TextCustom  label={'Fecha de Nacimiento'} id={'dateBirth'} value={moment(dateBirth).format("DD-MM-YYYY")} placeholder={"Seleccione fecha"} readOnly={true} />
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Icon name='calendar' size={45} style={styles.textButtonCal} />
                    </TouchableOpacity>
                </View>
            </View>
            <TextCustom label={'Correo Electronico'} id={'email'} value={email} placeholder={"Introduzca correo electronico"} onChange={handleOnChangeNoUser} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSiguiente} style={styles.button}>
                    <Icon name='arrow-forward-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
            </View>
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
        
    },
    button: {
        padding: '4%',
    },
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '5%',
    },
    textButtonCal: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '56%',
        // backgroundColor:'blue',
        marginRight:'7%'
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
    },
    inputCalendar: {
        fontSize:20,
        marginLeft: '6%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        marginRight:'5%',
        width:'130%'
    }
});
