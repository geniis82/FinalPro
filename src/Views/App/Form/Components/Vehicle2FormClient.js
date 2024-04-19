import React, { useCallback, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Alert, Text } from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Vehicle2FormClient = ({ open, value, vehicles, setOpen, setValue, setVehicles, handleDropDown, vehicleSec, poliza, handleGoBack, save }) => {


    return (

        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Vehiculo B</Text>
            <DropDownPicker
                listMode='SCROLLVIEW'
                placeholder='Seleccione un vehiculo'
                open={open}
                value={value}
                items={vehicles}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setVehicles}
                onChangeValue={handleDropDown}
                style={{ marginLeft: '4%', marginTop: '4%', flex: 1, width: '90%' }}
                dropDownContainerStyle={{ marginLeft: '4%', marginTop: '4%', width: '89.5%' }}
            />

            {vehicleSec &&
                <View>
                    <View style={{ paddingTop: '4%' }}>
                        <TextCustom label={'Matricula'} id={'matricula'} value={vehicleSec.label} />
                        <TextCustom label={'Marca'} id={'marca'} value={vehicleSec.options.marca} />
                        <TextCustom label={'Modelo'} id={'modelo'} value={vehicleSec.options.modelo} />
                    </View>
                    {poliza &&

                        <View>
                            <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} value={poliza.aseguradora_id[1]} />
                            <TextCustom label={'Numero de poliza'} id={'name'} value={poliza.name} />
                        </View>
                    }
                    {!poliza &&

                        <View >
                            <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} />
                            <TextCustom label={'Numero de poliza'} id={'name'} />
                        </View>

                    }
                </View>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={save} style={styles.button}>
                    <Icon name='send' size={55} style={styles.textButton} />
                </TouchableOpacity>
            </View>
        </ScrollView >
    )

}

export default Vehicle2FormClient

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

});