import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Signature from "react-native-signature-canvas";


const SignatureScreen = () => {
    const [signature, setSign] = useState(null);

    const handleOK = (signature) => {
        // console.log(signature);
        setSign(signature);
    };

    const handleEmpty = () => {
        console.log("Empty");
    };

    const style = `.m-signature-pad--footer
    .button {
    background-color: red;
    color: #FFF;
    }`;
    return (
        <View >
            <View style={styles.preview}>
                {signature ? (
                    <Image
                        resizeMode={"contain"}
                        style={{ width: 335, height: 114 }}
                        source={{ uri: signature }}
                    />
                ) : null}
            </View>
            <Signature
                onOK={handleOK}
                onEmpty={handleEmpty}
                descriptionText="Sign"
                clearText="Clear"
                confirmText="Save"
                webStyle={style}
            />
        </View>
    )
};

export default SignatureScreen;

const styles = StyleSheet.create({
    preview: {
        width: 335,
        height: 114,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        marginTop: '15%',
        marginBottom: '15%',
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10,
    },
});