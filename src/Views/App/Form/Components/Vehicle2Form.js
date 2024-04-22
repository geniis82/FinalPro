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

    const route = useRoute();
    const { user2Id } = route.params;
    const { flag1 } = route.params;
    const { client2 } = route.params;

    const [loaded, setLoaded] = useState(true);



    if (!loaded) return <Loader />


    return (
        <View>
            {flag1 ?
                <Vehicle2FormClient />
                :
                <Vehicle2FormNoClient/>
            }
        </View>
    )

}



export default Vehicle2Form