import React from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';




const CabeceraInfoPoliza = ({ poliza, handleOnChange }) => {


    return (
        <View>
            <TextCustom label={"Numero de Poliza"} id={'name'} value={poliza.name} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Fecha de inicio'} id={'dataInicio'} value={poliza.dataInicio} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Fecha de Expiración'} id={'dataFinal'} value={poliza.dataFinal} onChange={handleOnChange} readOnly={true} />
        </View>
    )


}

export default CabeceraInfoPoliza