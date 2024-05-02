export const htmlContent = (parte) => {
    return (
        `
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Parte de Accidente Europeo</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .accident-info {
                        margin-bottom: 20px;
                    }
                    .accident-info h2 {
                        font-size: 1.2em;
                        margin-bottom: 10px;
                    }
                    .accident-info table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }
                    .accident-info th, .accident-info td {
                        border: 1px solid #ccc;
                        padding: 8px;
                    }
                    .accident-info th {
                        background-color: #f2f2f2;
                    }
                    .participants {
                        margin-bottom: 20px;
                    }
                    .participants h2 {
                        font-size: 1.2em;
                        margin-bottom: 10px;
                    }
                    .participants table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }
                    .participants th, .participants td {
                        border: 1px solid #ccc;
                        padding: 8px;
                    }
                    .participants th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Parte Europeo de Accidente</h1>
                    </div>
                    <div class="accident-info">
                        <h2>Información del Accidente</h2>
                        <table>
                            <tr>
                                <th>Fecha y Hora</th>
                                <td>${parte.dataParte}</td>
                            </tr>
                            <tr>
                                <th>Lugar del Accidente</th>
                                <td>${parte.location}</td>
                            </tr>
                            <tr>
                                <th>Dirección del Accidente</th>
                                <td>${parte.addres}</td>
                            </tr>
                            <tr>
                                <th>Descripción del Accidente</th>
                                <td>${parte.descripcion}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="participants">
                        <h2>Usuario1</h2>
                        <table>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Vehiculo</th>
                                <th>Compañía de Seguros</th>
                                <th>Número de Póliza</th>
                            </tr>
                            <tr>
                                <td>${parte.client1.name + " " + parte.client1.surname}</td>
                                <td>${parte.client1.tlf}</td>
                                <td>${parte.vehiculo.name}</td>
                                <td>${parte.vehiculo.poliza_ids.aseguradora_id[1]}</td>
                                <td>${parte.vehiculo.poliza_ids.name}</td>
                            </tr>
                        </table>
                        <h2>Usuario2</h2>
                        <table>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Vehiculo</th>
                                <th>Compañía de Seguros</th>
                                <th>Número de Póliza</th>
                            </tr>
                            <tr>
                                <td>${parte.client2.name + " " + parte.client1.surname}</td>
                                <td>${parte.client2.tlf}</td>
                                <td>${parte.vehiculo2.name}</td>
                                <td>${parte.vehiculo2.poliza_ids.aseguradora_id[1]}</td>
                                <td>${parte.vehiculo2.poliza_ids.name}</td>
                            </tr>
                        </table>
                        </div>
                </div>
            </body>
        </html>
        `
    )
}

