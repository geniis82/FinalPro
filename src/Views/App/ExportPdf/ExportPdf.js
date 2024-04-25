import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native';

import { Platform } from 'react-native';
import { DownloadDirectoryPath, moveFile } from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf'

const ExportPdf = async () => {

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
            const options = {
                html: '<h1>PDF Test</h1>',
                fileName: 'Test',
            };
            const file = await RNHTMLtoPDF.convert(options);
            moveFile(file.filePath, DownloadDirectoryPath + "/" + file.fileName + ".pdf")
                .then(res => {
                    console.log('PDF creado con éxito');
                }).catch(err => {
                    console.error(err);
                });
        } catch (error) {
            console.error('Error al crear el PDF:', error);
            Alert.alert('Error al crear el PDF');
        }
    }

    return (
        { createPdf }
    )
}
export default ExportPdf;