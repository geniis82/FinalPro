import React, { useState, useEffect } from 'react'
import {
    View
} from 'react-native';
import TextCustom from '../../../../Components/TextCustom';

import { Text } from 'react-native-elements';
import { ENDPOINT_partes, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';


const ParteVehiculo1 = ({ parte, handleOnChange }) => {

    return (
        <View>
            <Text style={{ fontSize: 40 ,marginLeft:'4%'}}>Vehiculo A</Text>
            <TextCustom label={'Matricula'} id={'matricula'} value={parte.vehiculo.name} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Marca'} id={'marca'} value={parte.vehiculo.marca} onChange={handleOnChange} readOnly={true} />
            <TextCustom label={'Modelo'} id={'modelo'} value={parte.vehiculo.modelo} onChange={handleOnChange} readOnly={true} />
        </View>
    )
}

export default ParteVehiculo1