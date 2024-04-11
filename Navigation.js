import React, { useCallback, useState, useContext } from 'react';
import {
    ImageBackground,
    StyleSheet,
    View
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Login from "./src/Views/Auth/Login/Login";
import axios from "axios";
import { ScreensPaths } from "./utils/ScreensPaths";
import Icon from "react-native-ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Partes from './src/Views/App/Partes/Partes';
import Form from './src/Views/App/Form/Form';
import { ENDPOINT_auth } from './utils/endpoints';

const Stack = createStackNavigator();
const Draw = createDrawerNavigator();


const MyDraws = () => {
    const navigation = useNavigation()
    const handleLogout = async () => {
        const dni = await AsyncStorage.getItem('dni');
        axios
            .post(`${ENDPOINT_auth}/logout.php`, {
                dni
            })
            .then(async res => {
                let resp = res.data
                // console.log(resp);
                if (resp.status) {
                    // console.log(res.data);
                    await AsyncStorage.multiRemove(['userToken', 'dni', 'idUser']);
                    navigation.navigate("Auth")
                }
            })
            .catch(e => {
                console.log(`logout error ${e}`);
            });
    };

    return (
        <Draw.Navigator initialRouteName="My_Forms" drawerContent={item => (
            <DrawerContentScrollView {...item} >
                <ImageBackground style={{ padding: 50 }} source={{ uri: "https://picsum.photos/200/300" }} />
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...item} />
                    <DrawerItem label='Log Out' onPress={handleLogout} style={{ marginTop: '225%' }} />
                </View>
            </DrawerContentScrollView>
        )} screenOptions={{
            drawerStyle: {
                width: '50%',
            }
        }}>
            {ScreensPaths.map((item, index) => (
                <Stack.Screen
                    name={item.name}
                    component={item.component}
                    options={{ drawerIcon: () => { item.icon } }}
                    key={index}
                />
            ))}
        </Draw.Navigator>

    );
}



const Navigation = () => {
    // const {userInfo, splashLoading} = useContext(AuthContext);
    return (
        <NavigationContainer  >
            <Stack.Navigator initialRouteName="Login" >
                <Stack.Screen name="Auth" component={Login}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen name="App" component={MyDraws} options={{
                    headerShown: false,
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FBFC',
        paddingHorizontal: 20,
    },
    logo: {
        width: '70%',
        maxHeight: 200,
        marginBottom: 30,
    },
});