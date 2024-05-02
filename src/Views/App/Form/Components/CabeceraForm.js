import React, { useCallback, useEffect, useState } from 'react'
import {
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import moment from 'moment'
import { Text } from 'react-native-elements';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { setParteOnAsyncStorage } from '../../../../../utils/GeneralFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native';



const CabeceraForm = () => {

    const navigation = useNavigation()

    const [parte, setParte] = useState({
        dataParte: moment().format('YYYY-MM-DD'), // Incluye la fecha del parte en el estado inicial
        location: '',
        addres: '',
        descripcion: ''
    });


    useFocusEffect(
        useCallback(() => {
            cleanParte();
        }, []));

    // useEffect(() => {
    //     cleanParte();
    //     // fetchData();
    // }, []);

    const cleanParte = async () => {
        await AsyncStorage.removeItem(StorageKeys.PARTE)
        await AsyncStorage.removeItem(StorageKeys.DNI_SCANNED)
        setParte(prevParte => ({
            ...prevParte,
            location: '',
            addres: '',
            descripcion: ''
        }));
    }


    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setParte({ ...parte, [id]: value })
        // console.log(parte);
    }



    const handleSiguiente = async () => {
        await setParteOnAsyncStorage(StorageKeys.PARTE, JSON.stringify(parte));
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        console.log(p);
        navigation.navigate('UserForm');
    };


    return (
        <ScrollView style={styles.container}>
            <TextCustom label={'Fecha del Parte'} id={'dataParte'} value={moment().format('DD-MM-YYYY')} readOnly={true} onChange={handleOnChange} />
            <TextCustom label={'Localidad'} id={'location'} onChange={handleOnChange} value={parte.location} placeholder={'Localidad'} />
            <TextCustom label={'Dirección'} id={'addres'} onChange={handleOnChange} value={parte.addres} placeholder={'Dirección'} />
            <TextCustom
                label={'Descripción del accidente'}
                id={'descripcion'}
                value={parte.descripcion}
                onChange={handleOnChange}
                multiline={true}
                num={8}
                placeholder={'Descripción del accidente'}
                style={styles.input}
            />
            {/* <View>
                <Text style={styles.textLabel}>Descripción del accidente</Text>
                <TextInput style={styles.input} id={'description'} placeholder={'Descripción del accidente'} onChangeText={handleOnChange} multiline={true} numberOfLines={8} >{parte.descripcion}</TextInput>
            </View> */}
            <TouchableOpacity onPress={handleSiguiente} style={styles.button}>
                <Icon name='arrow-forward-circle' size={55} style={styles.textButton} />
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
        paddingBottom: '5%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '6%',
        marginBottom: '25%',

    },
    button: {
        paddingBottom: '4%',
        // backgroundColor:'red',
        marginLeft: '40%',
        marginRight: '40%',
        marginTop: '4%'
    },
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '5%'
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
    inputTextArea: {
        fontSize: 20,
        marginLeft: '3%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        marginRight: '5%',
        textAlignVertical: 'top',
    },
    textLabel: {
        fontSize: 22,
        marginLeft: '5%',
        marginTop: '4%',
        color: 'black'
    },
});

export default CabeceraForm