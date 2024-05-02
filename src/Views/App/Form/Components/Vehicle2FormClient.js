import React, { useCallback, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Alert, Text } from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINT_partes, ENDPOINT_poliza, ENDPOINT_vehicles } from '../../../../../utils/endpoints';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import OpenCamera from '../../../../../utils/OpenCamera';


const Vehicle2FormClient = () => {

    const route = useRoute();
    const { userSec } = route.params;

    const navigation = useNavigation()

    const [loaded, setLoaded] = useState(false);

    const [vehicles, setVehicles] = useState([]);
    const [poliza, setPoliza] = useState()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [vehicleSec, setVehicleSec] = useState();
    const [parte, setParte] = useState({})
    const [imgName, setImgName]=useState("")
    


    useFocusEffect(
        useCallback(() => {
            fetchVehicle()
            setVehicleSec("")
            setPoliza("")
            setValue("")
        }, []));

    const handleDropDown = () => {
        const itemSelect = vehicles.find(item => item.value === value);
        setVehicleSec(itemSelect);
        fetchAseguradora();
        setParte(prevState => ({
            ...prevState,
            vehiculo2: value
        }));
    };

    const save = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)

        axios.post(`${ENDPOINT_partes}/save.php`, {
            dni,
            token,
            ...parte,
        })
            .then(res => {
                const parteData = res.data
                console.log(parteData);
                if (parteData.status) {
                    Alert.alert('Parte Eniado', 'El parte se ha enviado correctamente', [
                        {
                            text: 'Aceptar',
                            onPress: () => navigation.navigate("Mis Partes"),
                            style: 'cancel',
                        },
                    ])
                    cleanScan();
                } else {
                    Alert.alert('Error', 'Introduzca todos los campos', [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                    ]);
                }
            })
            .catch(error => {
                console.error("error al crear parte", error);
            }).finally(() => setLoaded(true))
    }

    const saveFoto = async ({formData}) => {
        // const p = await AsyncStorage.getItem(StorageKeys.PARTE)
        // const storedParte = JSON.parse(p || '{}');
        // // console.log(p);
        // setParte(storedParte);
        axios.post(
            `${ENDPOINT_partes}/uploadParte.php`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        ).then(res => {
            const imageData = res.data;
            setImgName(imageData['image_url'])
            const updatedParte = { ...parte, photo: imageData['image_url'] };
            setParte(updatedParte);
            // console.log(imageData['image_url']);
        }).catch(error => {
            console.error('Error al subir la imagen:', error);
        });
    }

    const cleanScan = async () => {
        await AsyncStorage.removeItem(StorageKeys.DNI_SCANNED)
    }

    const handleGoBack = () => {
        navigation.navigate("User2Form");
    };

    const fetchVehicle = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        setParte(storedParte)
        axios.get(`${ENDPOINT_vehicles}/getVehiclesUserById.php`, {
            params: {
                dni,
                token,
                id: userSec.value
            }
        })
            .then(res => {
                const vehicleData = res.data
                console.log(vehicleData);
                if (vehicleData.status) {
                    const vec = vehicleData.vehicles
                    setVehicles(vec)
                } else {
                    console.log("No se pudo obtener los datos de los vehiculos2");
                }
            })
            .catch(error => {
                console.error("Error al obtener los vehiclos de un usuario", error);
            }).finally(() => setLoaded(true))
    }
    const fetchAseguradora = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.get(`${ENDPOINT_poliza}/getByVehiculoID.php`, {
            params: {
                dni,
                token,
                vehiculo_id: value
            }
        })
            .then(res => {
                const polizaData = res.data
                if (polizaData.status) {
                    // console.log(polizaData.poliza);
                    setPoliza(polizaData.poliza)
                } else {
                    // console.log("No se pudo obtener los datos de las polizas");
                }
            })
            .catch(error => {
                console.error("Error al obtener la poliza ", error);
            }).finally(() => setLoaded(true))
    }

    const handleLib = async ({ result }) => {
        const formData = new FormData();
        formData.append('file', {
            uri: result?.assets[0]?.uri,
            type: result?.assets[0]?.type,
            name: result?.assets[0]?.fileName,
        });
        saveFoto({formData})
    }

    return (

        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 40, marginLeft: '4%' }}>Vehiculo B</Text>
            <DropDownPicker
                listMode='SCROLLVIEW'
                placeholder='Seleccione un vehiculo'
                open={open}
                value={value}
                items={vehicles}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setVehicles}
                onChangeValue={handleDropDown}
                style={{ marginLeft: '4%', marginTop: '4%', flex: 1, width: '90%' }}
                dropDownContainerStyle={{ marginLeft: '4%', marginTop: '4%', width: '89.5%' }}
            />


            {vehicleSec &&
                <View>
                    <View style={{ paddingTop: '4%' }}>
                        <TextCustom label={'Matricula'} id={'matricula'} value={vehicleSec.label} style={styles.input} readOnly={true} />
                        <TextCustom label={'Marca'} id={'marca'} value={vehicleSec.options.marca} style={styles.input} readOnly={true} />
                        <TextCustom label={'Modelo'} id={'modelo'} value={vehicleSec.options.modelo} style={styles.input} readOnly={true} />
                    </View>
                    {poliza &&

                        <View>
                            <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} value={poliza.aseguradora_id[1]} style={styles.input} readOnly={true} />
                            <TextCustom label={'Numero de poliza'} id={'name'} value={poliza.name} style={styles.input} readOnly={true} />
                            <OpenCamera handleLib={handleLib} />
                        </View>

                    }
                    {!poliza &&
                        <View >
                            <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora_id'} style={styles.input} readOnly={true} />
                            <TextCustom label={'Numero de poliza'} id={'name'} style={styles.input} readOnly={true} />
                            <OpenCamera handleLib={handleLib} />
                        </View>

                    }
                </View>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={save} style={styles.button}>
                    <Icon name='send' size={55} style={styles.textButton} />
                </TouchableOpacity>
            </View>
        </ScrollView >
    )

}

export default Vehicle2FormClient

const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '6%',
        marginBottom: '25%',

    },
    button: {
        padding: '4%',

    },
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '5%',
    },
    input: {
        // marginTop: '2%',
        fontSize: 20,
        marginLeft: '3%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,
        marginRight: '5%',
        // textAlignVertical: 'top',
    }
});