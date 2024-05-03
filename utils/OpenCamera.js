import { StyleSheet, Image,  View, PermissionsAndroid } from "react-native";
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";




const OpenCamera = ({ handleLib }) => {

    const [imgUrl, setImgUrl] = useState('https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg');
    const [acceptedPermission, setAcceptedPermissions] = useState(false)

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
        const options = {

        }
        if (acceptedPermission) {
            const result = await launchImageLibrary();
            setImgUrl(result?.assets[0]?.uri);
            handleLib({ result })
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