const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = express.request) => {

    const { name, email, password } = req.body

    try{
        let usuario = await Usuario.findOne({ email:email })
        if ( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe',
            })
        }

        
        
        usuario = new Usuario( req.body );
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        
        res.status(200).json({
        ok: true,
        usuario
    })
    }
    catch(error){
        res.status(500).json({
            ok: false,
            msg: "Internal error"            
        })
    }
}

const loginUsuario = async (req, res = express.request) => {
    const { email, password } = req.body
    
    try{
        let usuario = await Usuario.findOne({ email:email })
        if ( usuario ){
            let comp = bcrypt.compareSync(password, usuario.password)
            if (comp) {
        
                const token = await( generarJWT(usuario.id, usuario.name) )
                return res.status(200).json({
                    ok: true,
                    msg: 'Bienvenido',
            usuario,
            token
                })
            }
            else{
                return res.status(200).json({
                    ok: true,
                    msg: 'La contraseña no coincide',
                })
            }
            
        }  else {
            res.status(200).json({
                ok: false,
                msg: "El usuario no existe"            
            })
        }
        const passwordValid = bcrypt.compareSync(password, usuario.password);
        if ( !passwordValid ){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida',
            })
        }
        

        res.status(200).json({
            ok:true,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Internal error"            
        })
    }
}


const revalidarToken = (req, res = express.request) => {
    const {uid, name} = req

    const token = await( generarJWT(uid, name) )

    res.json({
        ok:true
    })
}


module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}