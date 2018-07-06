const express = require('express');

const User = require('../models/User.js');

const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        user = new User;
        const newUser = await user.create(req.body, function(resM){
            return res.send(resM);
        });
    } catch (err){
        return res.status(400).send({erro: 'Cadastro falhou!'});
    }

});


module.exports = app => app.use('/auth', router);