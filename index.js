// const express = require('express')
// require('dotenv').config()
// const { dbConnection } = require('./database/config')
// const cors = require('cors')

// //crear app
// const app = express();

// dbConnection();

// app.use(cors())

// app.use( express.static('public'))

// //Lectura y parseo del body
// app.use( express.json() );

// //Rutas
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/task', require('./routes/task_routes'))


// //Escuchar en puerto 4000
// app.listen(process.env.PORT, () => {
//     console.log('Servidor escuchando en el puerto', process.env.PORT)
// })

const Server = require('./Server/sever');

const myServer = new Server();
myServer.listen();