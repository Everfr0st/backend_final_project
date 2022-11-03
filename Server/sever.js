const express = require('express')
require('dotenv').config()
const { dbConnection } = require('../database/config')
const cors = require('cors')
const { socketController } = require('../sockets/controller')

class Server {
    constructor() {
        //crea express app
        this.app = express();
        this.port = process.env.PORT;
        this.Server = require('http').createServer( this.app );
        this.io = require( 'socket.io' )( this.Server )

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
        this.Server.listen( this.port, () => {
            console.log('Servidor escuchando en puerto ', process.env.PORT)
        })
    }

    sockets() {
        this.io.on('connection', socket => {
            console.log('Cliente conectado', socket.id);
            socket.on('mensaje-de-cliente', ( payload, callback ) => {
                console.log( payload );

                callback('Tu mensaje fue recibido');

                payload.from = 'desde el server'
                this.io.emit('mensaje-de-server', payload);
                
            })

            socket.on('disconnect', () => {
                console.log('Cliente desconectado')
            })
        })
    }

}

module.exports = Server;