import UserForm from "../src/Views/App/Form/Components/UserForm";
import Form from "../src/Views/App/Form/Form";
import InfoPartes from "../src/Views/App/Partes/InfoPartes";
import ListaPartes from "../src/Views/App/Partes/ListaPartes";
import Partes from "../src/Views/App/Partes/Partes";
import Perfil from "../src/Views/App/Perfil/Perfil";
import InfoPolizas from "../src/Views/App/Polizas/InfoPolizas";
import Polizas from "../src/Views/App/Polizas/Polizas";
import UserQRCode from "../src/Views/App/QRCode/QRCode";
import { Paths } from "./paths";
export const ScreensPaths = [

    {
        title: 'My Forms',
        component: Partes,
        name: 'Mis Partes',
        iconName:'home-outline'
    },
    // {
    //     title: 'Form',
    //     component: Form,
    //     name: 'Parte',
    //     iconName:'document-outline'
    // },
    {
        title: 'Polizas',
        component: Polizas,
        name: 'Polizas',
        iconName:'list'

    },
    {
        title: 'QRCode',
        component: UserQRCode,
        name: 'QRCode',
        iconName:'qr-code-outline'
    },
    {
        title: 'Perfil',
        component: Perfil,
        name: "Perfil",
        iconName:'person-outline'
    },

]
