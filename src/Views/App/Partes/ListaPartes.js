import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StorageKeys } from "../../../../utils/StorageKeys";
import { Paths } from "../../../../utils/paths";
import { ENDPOINT_partes, ENDPOINT_user } from "../../../../utils/endpoints";
import moment from "moment";
import Icon from 'react-native-vector-icons/Ionicons';
import { ScreensPaths } from "../../../../utils/ScreensPaths";



const ListaPartes = () => {

    const [partes, setPartes] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [selectedId, setSelectedId] = useState();
    const { navigate } = useNavigation();

    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            fetchPartes()
            setSelectedId("")
        }, []));

    const fetchPartes = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI);
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN);
        const idUser = await AsyncStorage.getItem(StorageKeys.USER_ID)

        axios.get(`${ENDPOINT_partes}/getAll.php`, {
            params: {
                dni,
                token,
                idUser
            }
        })
            .then(res => {
                const partesUser = res.data;
                if (partesUser.status) {
                    setPartes(partesUser.partes);
                } else {
                    console.log("No se pudo obtener los datos de partes");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos de partes:", error);
            }).finally(() => setLoaded(true));
    }

    const handleNewParte = () => {
        navigate(Paths.parte)
    }



    const handleManageItem = (id) => {
        navigate(Paths.parts_info, {
            id: id,
        })
    }

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={() => onPress(item.id)} style={[styles.item, { backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>Fecha: {moment(item.dataParte).format("DD-MM-YYYY")}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {

        const backgroundColor = item.id === selectedId ? '#9a89c0' : '#cfd948';
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

    if (partes.length === 0) {
        return (
            <View>
                <Text style={styles.noParte}>No has relaizado ningun parte</Text>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={partes}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                />
                <TouchableOpacity onPress={handleNewParte} style={styles.button}>
                    <Icon name='add-circle' size={70} style={styles.textButton} reverse />
                </TouchableOpacity>
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
    },
    textButton: {
        position: 'absolute',
        bottom: 40,
        color: '#9a89c0',
        right: 30,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    }
});

export default ListaPartes