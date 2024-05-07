import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'


const Loader = () => {

    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={'large'} color="#9a89c0"/>
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
