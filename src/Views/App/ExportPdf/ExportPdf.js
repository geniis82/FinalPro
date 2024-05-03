import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Platform } from 'react-native';
import { DownloadDirectoryPath, moveFile } from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import FileViewer from 'react-native-file-viewer'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { htmlContent } from '../../../Template/PdfTemplate';
import { htmlContentNoCli } from '../../../Template/PdfTemplateNoClient';

const ExportPdf = ({ parte }) => {

    const [acceptedPermission, setAcceptedPermissions] = useState(false)
    const [acceptedPermissionREAD, setAcceptedPermissionsREAD] = useState(false)
    const [acceptedPermissionMAN, setAcceptedPermissionsMAN] = useState(false)
    // const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        requestStoragePermissions();
        requestStoragePermissionsREAD()
        requestStoragePermissionsMAN()
    }, [])

    const requestStoragePermissions = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
            .then(res => {
                if (res === PermissionsAndroid.RESULTS.GRANTED) {
                    setAcceptedPermissions(true)
                }
            }).catch(err => console.log(err))
    }

    const requestStoragePermissionsREAD = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            .then(res => {
                if (res === PermissionsAndroid.RESULTS.GRANTED) {
                    setAcceptedPermissionsREAD(true)
                }
            }).catch(err => console.log(err))
    }

    const requestStoragePermissionsMAN = () => {
        const OsVer = Platform.constants['Release'];
        if (OsVer >= 11) {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE)
                .then(res => {
                    if (res === PermissionsAndroid.RESULTS.GRANTED) {
                        setAcceptedPermissionsMAN(true)
                    }
                }).catch(err => console.log(err))
        }
    }

    const createPdf = async () => {
        if (!acceptedPermission && !acceptedPermissionREAD) {
            console.log('Permissions not granted');
            return;
        }
        try {
            let option={}
            // console.log(parte);
            if (parte.vehiculo2.poliza_ids.length===0) {
                option = {
                    html: htmlContentNoCli(parte),
                    fileName: "Report",
                }
            } else {
                option = {
                    html: htmlContent(parte),
                    fileName: "Report",
                };
                
            }
            const file = await RNHTMLtoPDF.convert(option);
            const finalPath = DownloadDirectoryPath + "/" + file.fileName + ".pdf"
            moveFile(file.filePath, finalPath)
                .then(res => {
                    Alert.alert('PDF creado', 'Path:' + finalPath, [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Open', onPress: () => openFile(finalPath) }
                    ], { cancelable: true });
                    // console.log('PDF creado con éxito');
                }).catch(err => {
                    console.error(err);
                });
        } catch (error) {
            Alert.alert('Error al crear el PDF');
        }
    }

    const openFile = (filePath) => {
        const path = filePath
        FileViewer.open(path) // absolute-path-to-my-local-file.
            .then(() => {
                // success
            })
            .catch((error) => {
                // error
            });
    }

    return (
        <View style={{ marginLeft: '69%', marginRight: '6%' }}>
            <TouchableOpacity onPress={() => createPdf()} style={styles.button}>
                <Text style={{ marginTop: '10%', marginRight: '8%' }}>Descargar</Text>
                <Icon name='file-pdf' size={30} style={styles.textButton} />
            </TouchableOpacity>
        </View>
    )
}
export default ExportPdf;

const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
        paddingBottom: '5%',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: '4%',
        // backgroundColor:'red',
        // marginLeft: '40%',
        marginRight: '10%',
        marginTop: '4%'
    },
    textButton: {
        textAlign: 'center',
        color: '#9a89c0',
        marginTop: '5%'
    },
});