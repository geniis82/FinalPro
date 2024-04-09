import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements';



const TextCustom = ({ label, value, onChange, id ,readOnly}) => {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput style={styles.input} id={id} onChange={onChange} readOnly={readOnly} >{value}</TextInput>
        </View>
    )
}

export default TextCustom;


const styles = StyleSheet.create({

    input: {
        width: '80%',
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: '5%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
    }
});
