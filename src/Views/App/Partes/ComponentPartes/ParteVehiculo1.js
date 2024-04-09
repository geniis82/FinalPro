import React from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';

import { Text } from 'react-native-elements';


const ParteVehiculo1 = ({parte,handleOnChange}) => {

    return (
        <View>
            <Text style={{fontSize:40}}>Vehiculo A</Text>
            <TextCustom label={'Matricula'} id={'matricula'} value={parte.matricula} onChange={handleOnChange} readOnly={true}/>
            <TextCustom label={'Marca'} id={'marca'} value={parte.marca} onChange={handleOnChange} readOnly={true}/>
            <TextCustom label={'Modelo'} id={'modelo'} value={parte.modelo} onChange={handleOnChange} readOnly={true}/>
        </View>
    )
}

export default ParteVehiculo1