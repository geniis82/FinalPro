import React from 'react'
import {
    StyleSheet,
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';


const InfoAseguradoraPoliza = ({ poliza, handleOnChange }) => {
    return (
        <View style={{marginBottom:'5%'}}>
            <TextCustom label={'Aseguradora'} id={'aseguradora_id'} value={poliza.aseguradora_id[1]} onChange={handleOnChange} readOnly={true}  />
        </View>
    )
}

export default InfoAseguradoraPoliza

