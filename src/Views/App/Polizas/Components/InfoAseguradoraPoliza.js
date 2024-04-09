import React from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';


const InfoAseguradoraPoliza = ({ poliza, handleOnChange }) => {
    return (
        <View>
            <TextCustom label={'Aseguradora'} id={'aseguradora_id'} value={poliza.aseguradora_id[1]} onChange={handleOnChange} readOnly={true} />
        </View>
    )
}

export default InfoAseguradoraPoliza