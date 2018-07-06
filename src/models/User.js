var db = require("../database/configDb.js");

class User {
    constructor (){
        this.db = db;
    }
    create(user, callback){
        this.db.query('INSERT INTO users SET ?', user, (err, res, fields) => {
            if(err){
                return callback(err);
            } else {
                return callback(res);
            }  
            this.db.end();    
        });
    }
}

module.exports = User;