import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useState } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, TouchableOpacity } from "react-native";
import { StorageKeys } from '../../../../utils/StorageKeys'
import axios from 'axios'
import { ENDPOINT_poliza } from '../../../../utils/endpoints'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Paths } from '../../../../utils/paths';

const Polizas = () => {
    const [polizas, setPolizas] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const navigation = useNavigation()
    const { navigate } = useNavigation();


    useFocusEffect(
        useCallback(() => {
            fetchPolizas()
            setSelectedId("")
        }, []));


    const fetchPolizas = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI);
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN);

        axios.get(`${ENDPOINT_poliza}/getPolizasByDni.php`, {
            params: {
                dni,
                token
            }
        })
            .then(res => {
                let polizasUser = res.data;
                if (polizasUser.status) {
                    setPolizas(polizasUser.polizas)
                } else {
                    console.log("No se pudo obtener los datos de polizas");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos de polizas:", error);
            }).finally(() => setLoaded(true));
    }


    const handleManageItem = (id) => {
        navigate(Paths.poliza_info, {
            id,
        })
    }

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={() => onPress(item.id)} style={[styles.item, { backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>{item.name}-{item.vehiculo_id[1]}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {

        const backgroundColor = item.id === selectedId ? '#cfd948' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';


        return (
            <Item
                item={item}
                onPress={handleManageItem}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    }

    if (!loaded) return null;

    if (polizas.length === 0) {
        return (
            <View>
                <Text style={styles.noParte}>No has relaizado ningun parte</Text>
            </View>
        )
    } else {
        return (
            <SafeAreaView>
                <FlatList
                    data={polizas}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#cfd948',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 25,
    },
    title: {
        fontSize: 25,
    },
    noParte: {
        textAlign: 'center',
        paddingTop: '66%'
    }
});

export default Polizas