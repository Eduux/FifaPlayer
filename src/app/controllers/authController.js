const express = require('express');

const User = require('../models/User.js');

const router = express.Router();

const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth');

const jwt = require('jsonwebtoken');

function generatoToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    try{
        user = new User;
        const newUser = await user.create(req.body, function(user){
            user.password = undefined;    
            return res.send({
                user,
                token: generatoToken({ id: user.id }),
            }); 
        });
    } catch (err){
        console.log(err);
        return res.status(400).send({erro: 'Cadastro falhou!'});
    }
});

router.post('/authenticate', async (req, res) => {
   const {email, password} = req.body;

   user = new User;

   user.find(email, async (user) => {
       if(!user){
           return res.status(400).send({error: 'Usuário não encontrado'});
       }
       if(!await bcrypt.compare(password, user.password)){
           return res.status(400).send({error: 'Senha inválida'});
       }

       user.password = undefined;

       return res.send({
           user,
           token: generatoToken({ id: user.id }),
        });   
   });
});


module.exports = app => app.use('/auth', router);