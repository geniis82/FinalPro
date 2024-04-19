import React from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import moment from 'moment';




const CabeceraInfoPoliza = ({ poliza, handleOnChange }) => {


    return (
        <View>
            <TextCustom label={"Numero de Poliza"} id={'name'} value={poliza.name} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Fecha de inicio'} id={'dataInicio'} value={moment(poliza.dataInicio).format("DD-MM-YYYY")} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Fecha de Expiración'} id={'dataFinal'} value={moment(poliza.dataFinal).format("DD-MM-YYYY")} onChange={handleOnChange} readOnly={true} />
        </View>
    )


}

export default CabeceraInfoPoliza