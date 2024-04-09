import React, { useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import OpenCamera from '../../../../utils/OpenCamera';
import DatePicker from 'react-native-date-picker'
import axios from "axios"

import SignatureScreen from '../../../../utils/SignaturePad';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextCustom from '../../../Components/TextCustom';
import UserForm from './Components/UserForm';
import Loader from '../../../Components/Loader';
import VehicleForm from './Components/VehicleForm';



const Form = () => {

    const [loaded, setLoaded] = useState(false);

    
    return (

        <ScrollView style={{padding:'4%'}}>
            <UserForm setLoaded={setLoaded} loaded={loaded} />
            <VehicleForm setLoaded={setLoaded} loaded={loaded} />
            {/* seleccion del vehiculo */}
            {/* inormacion del Vehiculo del cliente (se recoge de la api)*/}
            {/* <View style={{ flex: 1, paddingVertical: 80, paddingHorizontal: 40, justifyContent: 'space-between' }}>
                <DropDownPicker
                    open={openDD}
                    listMode='SCROLLVIEW'
                    value={value}
                    items={vehiclesUser}
                    setOpen={setOpenDD}
                    setValue={setValue}
                    setItems={setVehiclesUser}

                />
            </View>
            <Text>Marca: </Text>
            <TextInput style={styles.input}></TextInput>
            <Text>Matricula: </Text>
            <TextInput style={styles.input}></TextInput>

            {/* informacion de la aseguradora (se recoge de la api)
            <Text>Nombre: </Text>
            <TextInput style={styles.input}></TextInput>
            <Text>Numero de Poliza: </Text>
            <TextInput style={styles.input}></TextInput>


            <Text>Decripcion: </Text>
            <TextInput multiline={true} numberOfLines={5} style={styles.area} editable></TextInput>



            <View>
                <Text>Date</Text>
                <TouchableOpacity onPress={() => setOpen(true)} style={styles.input}>
                    <Text>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode='date'
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>
            <OpenCamera /> */}

            {/* <SignatureScreen></SignatureScreen> */}
        </ScrollView>

    );


}

// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//         marginBottom: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//     },
//     area: {
//         borderColor: 'black',
//         borderWidth: 1,
//         marginTop: '5%',
//         marginBottom: '5%',
//         marginLeft: '5%',
//         width: '80%',
//     }
// });

export default Form;