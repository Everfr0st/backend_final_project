require('dotenv').config()
const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
const { Server } = require('socket.io');
const http = require('http');
const port = process.env.PORT;

// Crear app
const app = express();

// Conexión a la base de datos
dbConnection();

// Middlewares
app.use(cors())
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/task', require('./routes/task_routes'))

// Creación del server con sockets
const httpServer = http.createServer(app);

// Sockets
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on(
    'connection',
    socket => {
        console.log('Cliente conectado', socket.id);
        
        socket.on('mensaje-de-cliente', (payload, callback) =>{
            console.log(payload);            
            io.emit("mensaje-de-servidor", payload);
        })
        
    });
    
    
httpServer.listen(port, () => {
    console.log('Servidor escuchando en el puerto:', process.env.PORT);
})