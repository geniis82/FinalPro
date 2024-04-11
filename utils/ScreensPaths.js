import Form from "../src/Views/App/Form/Form";
import InfoPartes from "../src/Views/App/Partes/InfoPartes";
import Partes from "../src/Views/App/Partes/Partes";
import InfoPolizas from "../src/Views/App/Polizas/InfoPolizas";
import Polizas from "../src/Views/App/Polizas/Polizas";
import { Paths } from "./paths";
export const ScreensPaths = [

    {
        title: 'My Forms',
        component: Partes,
        name: 'Mis Partes',
        showOnBar: true
    },
    {
        title: 'Form',
        component: Form,
        name: 'Parte',
        showOnBar: true
    },
    {
        title: 'Polizas',
        component: Polizas,
        name: 'Polizas',
        showOnBar: false

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