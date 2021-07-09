'use strict'
const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

const db = new sqlite.Database('memes.db', (err) => {
    if(err) throw err;
  });
  


exports.getUser = (username, password) =>{

    return new Promise((resolve, reject) =>{
        const sql = 'Select * from CREATORS where username = ?';
        db.get(sql, [username], (err, row) =>{
            if(err)
                reject(err); //db error
            else if (row === undefined)
                resolve(false);
            else{
                bcrypt.compare(password, row.hash).then(result => {
                    if(result)
                        resolve({id : row.c_id, username : row.username});
                    else{
                        resolve(false);
                    }
                }).catch(error => resolve(error));
            }
        });
    })
};

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM CREATORS WHERE c_id = ?';
        db.get(sql, [id], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined)
            resolve({error: 'User not found.'});
          else {
            // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
            const user = {id: row.c_id, username: row.username}
            resolve(user);
          }
      });
    });
};