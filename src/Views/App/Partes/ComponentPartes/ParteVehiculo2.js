import React from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import { Text } from 'react-native-elements';


const ParteVehiculo2 = ({parte,handleOnChange}) => {

    return (
        <View>
            <Text style={{fontSize:40}}>Vehiculo B</Text>
            <TextCustom label={'Matricula'} id={'matricula2'} value={parte.matricula2} onChange={handleOnChange} readOnly={true}/>
            <TextCustom label={'Marca'} id={'marca2'} value={parte.marca2} onChange={handleOnChange} readOnly={true}/>
            <TextCustom label={'Modelo'} id={'modelo2'} value={parte.modelo2} onChange={handleOnChange} readOnly={true}/>
            <TextCustom label={'Nombre Propietario'} id={'nameCliente2'} value={[parte.nameCliente2 ," ",parte.surname2]} onChange={handleOnChange} readOnly={true}/>
        </View>
    )
}

export default ParteVehiculo2