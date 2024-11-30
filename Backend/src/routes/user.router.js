import express from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../models/user.models.js';
import {isValidPassword, authorization, passportCall  } from '../utils.js';

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
            let token = jwt.sign({ email, password,role:"user" }, "coderSecret", { expiresIn: "24h" });

      res.cookie('tokenCookie', token, {maxAge: 60 * 60 * 1000, httpOnly: true})
      .send({ message: "Logged in successfully"});
        }

    }catch (error){
        res.status(500).json({error: error.message});
    }
})


//Nueva ruta protegida
router.get('/current', passportCall('jwt'), authorization('user'), (req, res) => { 
    res.send(req.user);
})

//Nueva ruta protegida
router.get('/admin', passportCall('jwt'), authorization('admin'), (req, res) => { 
    res.send(req.user);
})


export default router;