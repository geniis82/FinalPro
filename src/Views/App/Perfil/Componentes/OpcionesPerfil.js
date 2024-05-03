import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/Fontisto';
import { ENDPOINT_auth } from '../../../../../utils/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OpcionesPerfil = () => {
    const menuOptions = generateOptions();
    return (
        <View>
            {
                menuOptions.map((menu, index) => (
                    <ListItem key={index} style={styles.menuItem} onPress={menu.onPress}>
                        <Icon name={menu.iconNameLeft} color={menu.iconColorLeft} size={33} />
                        <ListItem.Content >
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon name={menu.iconNameRigth} color={menu.iconColorRigth} size={33} />
                    </ListItem>
                ))
            }
        </View>
    )
}
export default OpcionesPerfil;


const generateOptions = () => {
    const { navigate } = useNavigation()


    const alertGuradar = () =>
        Alert.alert('Cerrar sesión', 'Estas seguro de cerrar sesión?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            { text: 'OK', onPress: () => handleLogout() },
        ]);

    const handleLogout = async () => {

        const dni = await AsyncStorage.getItem('dni');
        axios
            .post(`${ENDPOINT_auth}/logout.php`, {
                dni
            })
            .then(async res => {
                let resp = res.data
                if (resp.status) {
                    // console.log(res.data);
                    await AsyncStorage.multiRemove(['userToken', 'dni', 'idUser', 'parte']);
                    navigate("Auth")
                }
            })
            .catch(e => {
                console.log(`logout error ${e}`);
            });
    }



    return [
        {
            title: "Cambiar Nombre y Apellidos",
            iconNameLeft: "person-circle",
            iconColorLeft: "#cfd948",
            iconNameRigth: "chevron-forward",
            iconColorRigth: "#cfd948",
            onPress: () => navigate("CambiarNombreYApellidos")
        },
        {
            title: "Cambiar Email y Telefono",
            iconNameLeft: "phone-portrait-outline",
            iconColorLeft: "#cfd948",
            iconNameRigth: "chevron-forward",
            iconColorRigth: "#cfd948",
            onPress: () => navigate("CambiarEmailYTelefono")
        },
        {
            title: "Cambiar Contraseña",
            iconNameLeft: "lock-closed-outline",
            iconColorLeft: "#cfd948",
            iconNameRigth: "chevron-forward",
            iconColorRigth: "#cfd948",
            onPress: () => navigate("CambiarPassword")
        },
        {
            title: "Cerrar Sesión",
            iconNameLeft: "log-out-outline",
            iconColorLeft: "#cfd948",
            iconNameRigth: "chevron-forward",
            iconColorRigth: "#cfd948",
            onPress: alertGuradar
        },
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3"
    }
})