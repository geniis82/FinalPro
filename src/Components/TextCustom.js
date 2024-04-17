import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements';



const TextCustom = ({ label, value, onChange, id, readOnly, multiline, num, keyboardType, maxLength, secureTextEntry, placeholder }) => {


    const handleOnChange = (value) => {
        onChange && onChange({ target: { id, value } })
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch', marginTop: '2%' }}>
            <Text style={[styles.textLabel, { width: '24%' }]}>{label}</Text>
            <TextInput style={[styles.input, { width: '65%' }]} id={id} placeholder={placeholder} onChangeText={handleOnChange} readOnly={readOnly} secureTextEntry={secureTextEntry} multiline={multiline} numberOfLines={num} keyboardType={keyboardType} maxLength={maxLength}>{value}</TextInput>
        </View>
    )
}

export default TextCustom;


const styles = StyleSheet.create({

    textLabel: {
        fontSize: 15,
        marginLeft: '5%',
        marginTop: '4%'
    },
    input: {
        // marginTop: '2%',
        marginBottom: '5%',
        marginLeft: '3%',
        borderWidth: 1,
        paddingStart: '5%',
        borderColor: 'black',
        borderRadius: 15,

    }
});
