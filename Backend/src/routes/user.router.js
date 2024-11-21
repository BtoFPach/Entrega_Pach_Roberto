import express from 'express';
import UserService from '../models/user.models.js';
import {isValidPassword, generateToken, verifyToken } from '../utils.js';

const router = express.Router();

//Registro de usuario
router.post('/register', async (req, res) => {
    try{
        const newUser = new UserService(req.body);
        await newUser.save()
        res.json({message: 'Usuario registrado exitosamente'})
    }catch (error){
        res.status(400).json({error: error.message});
    }
})

//Ruta para login
router.post('/login', async (req, res) => {
    try{
        const user = await UserService.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({error: 'Usuario no encontrado'});
        }

        if(!isValidPassword(user, password)){
            return res.status(400).json({error: 'Credenciales inválidas'});
        }

        const token = generateToken({userId: user._id, role: user.role});
        res.cookie('currentUser', token, { httpOnly: true});
        res.json({message: 'Inicio de sesión exitoso'});

    }catch (error){
        res.status(500).json({error: error.message});
    }
})


export default router;