import React, { useCallback, useState } from 'react'

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { ENDPOINT_partes, ENDPOINT_poliza, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import Loader from '../../../../Components/Loader';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Vehicle2FormClient from './Vehicle2FormClient';
import Vehicle2FormNoClient from './Vehicle2FormNoClient';


const Vehicle2Form = () => {

    const route = useRoute()
    const { client2 } = route.params;
    const { userSec } = route.params;
    const { flag } = route.params

    const [loaded, setLoaded] = useState(true);


    // console.log(flag);

    if (!loaded) return <Loader />


    return (
        <View>
            {+flag === 2 &&
                <Vehicle2FormClient />
            }
            {+flag === 1 &&
                <Vehicle2FormNoClient />
            }

        </View>
    )

}



export default Vehicle2Form