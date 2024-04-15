import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import moment from 'moment'
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { setParteOnAsyncStorage } from '../../../../../utils/GeneralFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';



const CabeceraForm = () => {

    const navigation = useNavigation()
    // const [parte, setParte] = useState({})

    const [parte, setParte] = useState({
        dataParte: moment().format('YYYY-MM-DD'), // Incluye la fecha del parte en el estado inicial
        location: '',
        addres: '',
        descripcion: ''
    });


    useEffect(() => {
        cleanParte();
        // fetchData();
    }, []);

    const cleanParte = async () => {
        await AsyncStorage.removeItem(StorageKeys.PARTE)
        setParte(prevParte => ({
            ...prevParte,
            location: '',
            addres: '',
            descripcion: ''
        }));
    }


    // const fetchData = async () => {
    //     const storedParte = await AsyncStorage.getItem(StorageKeys.PARTE);
    //     if (storedParte) {
    //         setParte(storedParte);
    //     }
    // };

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setParte({ ...parte, [id]: value })
    }



    const handleSiguiente = async () => {
        await setParteOnAsyncStorage(StorageKeys.PARTE, JSON.stringify(parte));
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        console.log(p);
        navigation.navigate('UserForm');
    };


    return (
        <ScrollView style={styles.container}>
            <TextCustom label={'Fecha del Parte'} id={'dataParte'} value={parte.dataParte} onChange={handleOnChange} />
            <TextCustom label={'Localidad'} id={'location'} onChange={handleOnChange} value={parte.location} />
            <TextCustom label={'Direccion'} id={'addres'} onChange={handleOnChange} value={parte.addres} />
            <TextCustom
                label={'Descripción del accidente'}
                id={'descripcion'}
                value={parte.descripcion}
                onChange={handleOnChange}
                multiline={true}
                num={10}
            />
            <TouchableOpacity onPress={handleSiguiente} style={styles.button}>
                <Icon name='arrow-forward-circle' size={55}  style={styles.textButton} />
                {/* <Text style={styles.textButton}>Siguiente</Text> */}
            </TouchableOpacity>
        </ScrollView>
    )
}

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
        marginTop: '5%'
    },

});

export default CabeceraForm