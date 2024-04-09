import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({ onPress, text }) => {
    return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        alignItems: 'center',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#E8E8E8',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CustomButton;