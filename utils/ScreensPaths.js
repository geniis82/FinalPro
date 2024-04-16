import UserForm from "../src/Views/App/Form/Components/UserForm";
import Form from "../src/Views/App/Form/Form";
import InfoPartes from "../src/Views/App/Partes/InfoPartes";
import Partes from "../src/Views/App/Partes/Partes";
import Perfil from "../src/Views/App/Perfil/Perfil";
import InfoPolizas from "../src/Views/App/Polizas/InfoPolizas";
import Polizas from "../src/Views/App/Polizas/Polizas";
import { Paths } from "./paths";
export const ScreensPaths = [

    {
        title: 'My Forms',
        component: Partes,
        name: 'Mis Partes',
        showOnBar: true,
        iconName:'home-outline'
    },
    {
        title: 'Form',
        component: Form,
        name: 'Parte',
        showOnBar: true,
        iconName:'document-outline'
    },
    {
        title: 'Polizas',
        component: Polizas,
        name: 'Polizas',
        showOnBar: true,
        iconName:'list'

    },
    {
        title: 'Perfil',
        component: Perfil,
        name: "Perfil",
        showOnBar: false,
        iconName:'person-outline'
    },
    {
        title: 'Info partes',
        component: InfoPartes,
        name: Paths.parts_info,
        showOnBar: false
    },
    {
        title: 'Info Polizas',
        component: InfoPolizas,
        name: Paths.poliza_info,
        showOnBar: false
    },

]
