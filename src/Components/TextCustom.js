import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements';



const TextCustom = ({ label, value, onChange, id, readOnly ,multiline,num}) => {


    const handleOnChange = (value) => {
        onChange && onChange({ target: { id, value } })
    }

    return (
        <View>
            <Text style={styles.textLabel}>{label}</Text>
            <TextInput style={styles.input} id={id} onChangeText={handleOnChange} readOnly={readOnly} multiline={multiline} numberOfLines={num} >{value}</TextInput>
        </View>
    )
}

export default TextCustom;


const styles = StyleSheet.create({

    textLabel:{
        fontSize:22,
        marginLeft:'5%',

    },
    input: {
        width: '80%',
        marginTop: '2%',
        marginBottom: '5%',
        marginLeft: '5%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius:15
    }
});
