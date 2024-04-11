import React from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';




const CabeceraInfoPartes = ({ parte, handleOnChange }) => {


    return (
        <View>
            <TextCustom label={'Fecha del Parte'} id={'dataParte'} value={parte.dataParte} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Localidad'} id={'location'} value={parte.location} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Direccion'} id={'addres'} value={parte.addres} onChange={handleOnChange} readOnly={true} />
        </View>
    )

}

export default CabeceraInfoPartes;