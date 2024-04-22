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
    }



    const handleSiguiente = async () => {
        await setParteOnAsyncStorage(StorageKeys.PARTE, JSON.stringify(parte));
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        console.log(p);
        navigation.navigate('UserForm');
    };


    return (
        <ScrollView style={styles.container}>
            <TextCustom label={'Fecha del Parte'} id={'dataParte'} value={moment().format('DD-MM-YYYY')} onChange={handleOnChange} />
            <TextCustom label={'Localidad'} id={'location'} onChange={handleOnChange} value={parte.location} />
            <TextCustom label={'Direccion'} id={'addres'} onChange={handleOnChange} value={parte.addres} />
            <TextCustom
                label={'Descripción del accidente'}
                id={'descripcion'}
                value={parte.descripcion}
                onChange={handleOnChange}
                multiline={true}
                num={8}
                
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
        marginLeft:'40%',
        marginRight:'40%',
        marginTop:'4%'
    },
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '5%'
    },

});

export default CabeceraForm