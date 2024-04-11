import React, { useEffect, } from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import moment from 'moment'



const CabeceraForm = ({ setLoaded, loaded, setParte, parte, handleOnChange }) => {

    useEffect(() => {
        parte.dataParte = moment().format('YYYY-MM-DD')
    }, [])

    console.log(parte);
    return (
        <View>
            <TextCustom label={'Fecha del Parte'} id={'dataParte'} value={moment().format('DD-MM-YYYY')} onChange={handleOnChange} />
            <TextCustom label={'Localidad'} id={'location'} onChange={handleOnChange} value={parte.location} />
            <TextCustom label={'Direccion'} id={'addres'} onChange={handleOnChange} value={parte.addres} />
        </View>
    )
}

export default CabeceraForm