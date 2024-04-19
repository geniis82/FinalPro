import React from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import moment from 'moment';




const CabeceraInfoPartes = ({ parte, handleOnChange }) => {


    return (
        <View>
            <TextCustom label={'Fecha del Parte'} id={'dataParte'} value={moment(parte.dataParte).format("DD-MM-YYYY")} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Localidad'} id={'location'} value={parte.location} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Direccion'} id={'addres'} value={parte.addres} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Descripcion'} value={parte.descripcion} readOnly={true} multiline={true} num={10} />
        </View>
    )

}

export default CabeceraInfoPartes;