
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import OpcionesPerfil from './Componentes/OpcionesPerfil';
import CambiarNombreYApellidos from './Componentes/CambiarNombreYApellidos';
import CambiarEmialYTelefono from './Componentes/CambiarEmailYTelefono';
import CambiarContraseña from './Componentes/CambiarContraseña';

const Perfil = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name='OpcionesPerfil' options={{headerShown:false}}>
                {() => <OpcionesPerfil />}
            </Stack.Screen>
            <Stack.Screen name='CambiarNombreYApellidos' options={{headerShown:false}}>
                {() => <CambiarNombreYApellidos />}
            </Stack.Screen>
            <Stack.Screen name='CambiarEmailYTelefono' options={{headerShown:false}}>
                {() => <CambiarEmialYTelefono />}
            </Stack.Screen>
            <Stack.Screen name='CambiarPassword' options={{headerShown:false}}>
                {() => <CambiarContraseña />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}



export default Perfil