import React, { useCallback, useState, useContext, useEffect } from 'react';
import {
    ImageBackground,
    StyleSheet,
    View
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native";
import Login from "./src/Views/Auth/Login/Login";
import axios from "axios";
import { ScreensPaths } from "./utils/ScreensPaths";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Partes from './src/Views/App/Partes/Partes';
import Form from './src/Views/App/Form/Form';
import { ENDPOINT_auth, ENDPOINT_user } from './utils/endpoints';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Text, Title } from 'react-native-paper';
import { StorageKeys } from './utils/StorageKeys';



const Stack = createStackNavigator();
const Draw = createDrawerNavigator();


const MyDraws = () => {

    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        const dni = await AsyncStorage.getItem(StorageKeys.USER_DNI)
        // console.log(dni);
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN)
        axios.get(`${ENDPOINT_user}/getUser.php`, {
            params: {
                dni,
                token
            }
        })
            .then(res => {
                const userData = res.data
                // console.log(userData);
                if (userData.status) {
                    setUser(userData.user)
                } else {
                    console.log("no se pudo obtener los datos del usuario navi");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos del user", error);
            }).finally(() => setLoaded(true))
    }

    return (
        <Draw.Navigator initialRouteName="My_Forms" drawerContent={item => (
            <DrawerContentScrollView {...item} contentContainerStyle={{ backgroundColor: '#9a89c9' }} >
                <View style={{ flexDirection: 'row',margin:'4%' }}>
                    <Avatar.Icon icon={'account'} size={50} style={{backgroundColor:'#cfd984'}}  color='#9a89c9'/>
                    <View style={{marginLeft:10, flexDirection:'column'}}>
                        <Title style={{fontSize:17}}>{user.name} {user.surname}</Title>
                        <Text>{user.email}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...item} />
                </View>
            </DrawerContentScrollView>
        )} screenOptions={{
            drawerStyle: {
                width: '75%',
            },
            drawerActiveTintColor: 'black',
            drawerActiveBackgroundColor: '#cfd984',
            drawerLabelStyle: { marginLeft: -20 }
        }}>
            {ScreensPaths.map((item, index) => (
                <Stack.Screen
                    name={item.name}
                    component={item.component}
                    options={{
                        drawerIcon: () => (
                            <Icon name={item.iconName} size={30} color="black" />
                        )
                    }}
                    key={index}
                />
            ))}
        </Draw.Navigator>
    );
}



const Navigation = () => {

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