import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react'
import { Alert, PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import { StorageKeys } from '../../../../../utils/StorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';


const QRScann = () => {
    const navigation = useNavigation()

    const device = useCameraDevice('back')
    const { hasPermission } = useCameraPermission()

    const [flag, setFlag] = useState(false)

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: async (codes) => {
            if (!flag) {
                setFlag(true);
                const user = JSON.parse(codes[0].value);
                const dni = user['dni'];
                await AsyncStorage.setItem(StorageKeys.DNI_SCANNED, dni);
                Alert.alert('Escaneando', 'Usuario encontrado', [
                    {
                        text: 'Aceptar',
                        onPress: () => navigation.navigate("User2Form"),
                        style: 'cancel',
                    },
                ]);
            }
        },
    });

    const handleGoBack = () => {
        navigation.goBack();
    };

    if (!hasPermission) return <PermissionsPage />
    if (device == null) return <NoCameraDeviceError />


    return (
        <View>
            <View style={{ height: '80%' }}>
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    codeScanner={codeScanner}
                    isActive={true}
                    photo={true}
                    enableZoomGesture={true}
                />
            </View>
            <View>
                <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                    <Icon name='arrow-back-circle' size={55} style={styles.textButton} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default QRScann

const styles = StyleSheet.create({
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '5%',
    },
    button: {
        padding: '4%',
    },
});