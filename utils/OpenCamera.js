import { StyleSheet, Image, Text, View, PermissionsAndroid, Platform } from "react-native";
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import { ENDPOINT_partes } from "./endpoints";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";


const OpenCamera = () => {

    const [imgUrl, setImgUrl] = useState('https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg');
    const [acceptedPermission, setAcceptedPermissions] = useState(false)
    // const [imageUri, setImageUri] = useState(null);.
    const [formData, setFormData] = useState({})


    useEffect(() => {
        requestGaleriaPermisions();
    }, [])


    const requestGaleriaPermisions = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            .then(res => {
                // console.log(res);
                if (res === PermissionsAndroid.RESULTS.GRANTED) {
                    setAcceptedPermissions(true)
                }
            }).catch(err => console.log(err))

    }

    const openLib = async () => {
        if (acceptedPermission) {
            const result = await launchImageLibrary();
            setImgUrl(result?.assets[0]?.uri);
            const formData = new FormData();
            formData.append('file', {
                uri: result?.assets[0]?.uri,
                type: result?.assets[0]?.type,
                name: result?.assets[0]?.fileName,
            });
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
                console.log(imageData);
            }).catch(error => {
                console.error('Error al subir la imagen:', error);
            });
        }
    };


    return (
        <View style={strles.container}>
            <TouchableOpacity onPress={openLib} style={strles.btnCam} >
                <Image resizeMode="contain" style={strles.img} source={{ uri: imgUrl, }} />
            </TouchableOpacity>
        </View>
    );

};

export default OpenCamera;

const strles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        marginTop: '15%',
        marginBottom: '15%',

    },
    img: {
        width: '90%',
        height: 300,
        alignSelf: 'center',
        borderRadius: 6,
    },
    btnCam: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',


    },

})