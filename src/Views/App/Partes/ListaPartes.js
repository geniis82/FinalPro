import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StorageKeys } from "../../../../utils/StorageKeys";
import { Paths } from "../../../../utils/paths";
import { StackView, createStackNavigator } from "@react-navigation/stack";
import { ENDPOINT_partes, ENDPOINT_user } from "../../../../utils/endpoints";
import moment from "moment";



const ListaPartes = () => {

    const [partes, setPartes] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [selectedId, setSelectedId] = useState();
    const { navigate } = useNavigation();



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



    const handleManageItem = (id) => {
        navigate(Paths.parts_info, {
            id:id,
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
            <SafeAreaView>
                <FlatList
                    data={partes}
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

export default ListaPartes