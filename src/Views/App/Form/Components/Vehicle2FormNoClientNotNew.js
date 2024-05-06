import React, { useCallback, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextCustom from '../../../../Components/TextCustom';
import OpenCamera from '../../../../../utils/OpenCamera';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../../../utils/StorageKeys';
import axios from 'axios';
import { ENDPOINT_partes, ENDPOINT_vehicles } from '../../../../../utils/endpoints';


const Vehicle2FormNoClientNotNew = () => {

    const route = useRoute();
    const { client2 } = route.params;
    const { userSec } = route.params;

    const [parte, setParte] = useState({})

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [vehicleSec, setVehicleSec] = useState();
    const [vehicles, setVehicles] = useState([]);
    const [vehicle2, setVehcle2] = useState({})
    const [matricula, setMatricula] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [aseguradora, setAseguradora] = useState("");
    const [numPoliza, setNumPoliza] = useState("")
    const [loaded, setLoaded] = useState(false);
    const [imgName, setImgName] = useState("")
    const [poliza_ids, setPoliza_ids] = useState({})

    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            cargarParte()
            setMarca("")
            setMatricula("")
            setModelo("")
            setAseguradora("")
            setNumPoliza("")
            fetchVehicle()
            setVehicleSec("")
            setValue("")
        }, []));

    const handleDropDown = () => {
        const itemSelect = vehicles.find(item => item.value === value);
        setVehicleSec(itemSelect);
        console.log(itemSelect);
        // fetchAseguradora();
        setParte(prevState => ({
            ...prevState,
            vehiculo2: value
        }));

    };

    const cargarParte = async () => {
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        setParte({ ...storedParte, ["client2"]: client2 })
        setLoaded(true)
    }

    const save = async () => {
        let updatedParte = ({});
        if (vehicleSec === undefined) {
            updatedParte = { ...parte, vehiculo2: vehicle2, poliza_ids: poliza_ids };
        } else {
            updatedParte = { ...parte, vehiculo2: vehicleSec.value, poliza_ids: poliza_ids };
        }
        await AsyncStorage.setItem(StorageKeys.PARTE, JSON.stringify(updatedParte));
        setParte(updatedParte);
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.post(`${ENDPOINT_partes}/save.php`, {
            dni,
            token,
            ...updatedParte,
        })
            .then(res => {
                const parteData = res.data
                // console.log(parteData);
                if (parteData.status) {
                    Alert.alert('Parte Enviado', 'El parte se ha enviado correctamente', [
                        {
                            text: 'Aceptar',
                            onPress: () => navigation.navigate("Mis Partes"),
                            style: 'cancel',
                        },
                    ]);
                } else {
                    Alert.alert('Error', parteData.message, [
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
    };

    const saveFoto = async ({ formData }) => {
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

    const handleGoBack = () => {
        navigation.navigate("User2Form");
    };

    const fetchVehicle = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        const p = await AsyncStorage.getItem(StorageKeys.PARTE);
        const storedParte = JSON.parse(p || '{}');
        setParte(storedParte)
        // console.log(userSec);
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
                    // console.log(vec);
                    setVehicles(vec)
                } else {
                    console.log("No se pudo obtener los datos de los vehiculos2");
                }
            })
            .catch(error => {
                console.error("Error al obtener los vehiclos de un usuario", error);
            }).finally(() => setLoaded(true))
    }

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setVehcle2({ ...vehicle2, [id]: value })
        // console.log(parte);
    }

    const handlePol = (e) => {
        const { id, value } = e.target;
        setPoliza_ids({ ...poliza_ids, [id]: value })
    }

    const handleLib = async ({ result }) => {
        const formData = new FormData();
        formData.append('file', {
            uri: result?.assets[0]?.uri,
            type: result?.assets[0]?.type,
            name: result?.assets[0]?.fileName,
        });
        saveFoto({ formData })
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
                <View style={{ paddingTop: '4%' }}>
                    <TextCustom label={'Matricula'} id={'matricula'} value={vehicleSec.label} style={styles.input} readOnly={true} />
                    <TextCustom label={'Marca'} id={'marca'} value={vehicleSec.options.marca} style={styles.input} readOnly={true} />
                    <TextCustom label={'Modelo'} id={'modelo'} value={vehicleSec.options.modelo} style={styles.input} readOnly={true} />
                </View>
            }{!vehicleSec &&
                <View style={{ paddingTop: '4%' }}>
                    <TextCustom label={'Matricula'} id={'matricula'} value={matricula} style={styles.input} onChange={handleOnChange} placeholder={'Matricula'} />
                    <TextCustom label={'Marca'} id={'marca'} value={marca} style={styles.input} onChange={handleOnChange} placeholder={'Marca'} />
                    <TextCustom label={'Modelo'} id={'modelo'} value={modelo} style={styles.input} onChange={handleOnChange} placeholder={'Modelo'} />
                </View>
            }
            <View >
                <TextCustom label={'Nombre de la Aseguradora'} id={'aseguradora'} value={aseguradora} onChange={handlePol} placeholder={'Nombre de la aseguradora'} />
                <TextCustom label={'Numero de poliza'} id={'numPoliza'} value={numPoliza} onChange={handlePol} placeholder={'Numero de poliza'} />
            </View>
            <OpenCamera handleLib={handleLib} />


            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={save} style={styles.button}>
                    <Icon name='send' size={55} style={styles.textButton} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )



}

export default Vehicle2FormNoClientNotNew

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