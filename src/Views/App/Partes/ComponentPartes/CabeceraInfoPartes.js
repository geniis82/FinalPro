import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import moment from 'moment';




const CabeceraInfoPartes = ({ parte, handleOnChange }) => {


    return (
        <View style={styles.container}>
            <TextCustom label={'Fecha del Parte'} id={'dataParte'} value={moment(parte.dataParte).format("DD-MM-YYYY")} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Localidad'} id={'location'} value={parte.location} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Direccion'} id={'addres'} value={parte.addres} onChange={handleOnChange} readOnly={true} />
            <View style={styles.descripcionContainer}>
                <Text style={styles.textLabel}>Descripcion</Text>
                <TextInput style={styles.input} readOnly={true} multiline={true} numberOfLines={6}>{parte.descripcion}</TextInput>
            </View>
        </View>
    )

}

export default CabeceraInfoPartes;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },

    textLabel: {
        fontSize: 22,
        marginLeft: '5%',
        marginTop: '4%',
        color:'black'
    },
    input: {
        fontSize: 20,
        marginLeft: '3%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        marginRight: '5%',
        textAlignVertical: 'top',
    }
});