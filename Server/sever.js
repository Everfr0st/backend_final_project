const express = require('express')
require('dotenv').config()
const { dbConnection } = require('../database/config')
const cors = require('cors')
const { socketController } = require('../sockets/controller')
const { WebSocketServer } = require('ws');
const { Server } = require('socket.io');

class theServer {
    constructor() {
        //crea express app
        this.app = express();
        this.port = process.env.PORT;
        this.httpServer = require('http').createServer( this.app);
        this.io = new Server(this.httpServer, {
            cors: {
                origin: "http://127.0.0.1:5173",
                methods: ["GET", "POST"]
            }
        });

        this.paths = {
            auth: '/api/auth',
            task: '/api/task'
        }

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();

        this.sockets();
    }

    //base de datos

    async connectToDB() {
        await dbConnection();
    }

    addMiddlewares() {
        this.app.use( cors() )

        this.app.use( express.json() );

        this.app.use( express.static('public') )
    }

    setRoutes() {
        this.app.use( this.paths.auth, require('../routes/auth') )
        this.app.use( this.paths.task, require('../routes/task_routes') )
    }

    listen() {
        this.httpServer.listen( this.port, () => {
            console.log('Servidor escuchando en puerto ', process.env.PORT)
        })
    }

    sockets() {
        this.io.on(
            'connection',
            socket => socketController(socket, this.io)
        )
    }

}

module.exports = theServer;