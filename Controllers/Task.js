const express = require('express');
const bcrypt = require('bcryptjs');
const Task = require('../models/Task');
const { generarJWT } = require('../helpers/jwt');

const crearTasks = async ( req, res = express.request) => {
    const task = new Task( req.body );

    try{
        task.user = req.uid;
        const saved = await task.save();
        res.json({
            ok: true,
            task: saved
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            task: 'internal error'
        })
    }
}

const listarTasks = async( req, res = express.request ) => {
    const tasks = await Task.find().populate('user', 'name');

    try {
        res.status(200).json({
            ok:true,
            tasks,
        })
    } catch(error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        })
    }
}

const actualizarTask = async( req, res = express.request ) => {

}

const eliminarTask = async( req, res = express.request ) => {
    
}


module.exports = {crearTasks, listarTasks, actualizarTask, eliminarTask};