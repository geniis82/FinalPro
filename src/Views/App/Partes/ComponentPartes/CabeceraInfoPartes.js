import React from 'react'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    ViewComponent
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';


const CabeceraInfoPartes = ({ parte, handleOnChange }) => {



    return (
        <View style={styles.descripcionContainer}>
            <TextCustom label={'Fecha del Parte'} id={'dataParte'} value={moment(parte.dataParte).format("DD-MM-YYYY")} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Localidad'} id={'location'} value={parte.location} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Direccion'} id={'addres'} value={parte.addres} onChange={handleOnChange} readOnly={true} />
            <View>
                <Text style={styles.textLabel}>Descripcion</Text>
                <TextInput style={styles.input} readOnly={true} multiline={true} numberOfLines={6}>{parte.descripcion}</TextInput>
            </View>
            <View style={styles.imageView}>
                <Text style={styles.textLabel}>Imagen del Accidente</Text>
                <Image source={{ uri: `data:image/jpg;base64,${parte.photo}` }} style={styles.logo}  resizeMode="contain"/>
            </View>
        </View>
    )

}

export default CabeceraInfoPartes;

const styles = StyleSheet.create({
    textLabel: {
        fontSize: 22,
        marginLeft: '5%',
        marginTop: '4%',
        color: 'black'
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
    },
    logo: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    descripcionContainer: {
        // height: '60%',
    },
    imageView: {
        height: 300, 
        marginTop: '4%',
        // backgroundColor:'blue'
    }
});