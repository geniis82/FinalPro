import React from 'react'
import { Camera,  useCameraDevice,  useCameraDevices,  useCodeScanner } from 'react-native-vision-camera'


const QRScann = () => {

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`)
        }
    })
    return <Camera
        device={useCameraDevice('back')}
        codeScanner={codeScanner}
    />
}

export default QRScann