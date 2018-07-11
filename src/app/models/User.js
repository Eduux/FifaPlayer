var db = require("../../database/configDb.js");
const bcrypt = require('bcryptjs');

class User {
    constructor (){
        this.db = db;
        this.bcrypt = bcrypt;
    }
    async create(user, callback){
        user.password = await this.hash(user.password);
        this.db.query('INSERT INTO users SET ?', user, (err, res, fields) => {
            if(err){
                return callback(JSON.stringify("Usuario já existe"));
            } else {
                return callback(user);
            }  
            this.db.end();    
        });
    }
    async hash(password){
        const hash = await this.bcrypt.hash(password, 10);
        return hash;
    }
    async find(email, callback){
        await this.db.query('SELECT * FROM users WHERE  email = ?', email, (err, res) => {
            if(err){
                return callback(JSON.stringify("Login invalido"));
            } else {
                return callback(res[0]);
            }  
            this.db.end();    
        });
    }
}

module.exports = User;