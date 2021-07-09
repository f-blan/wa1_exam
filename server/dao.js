'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');


// open the database
const db = new sqlite.Database('memes.db', (err) => {
  if(err) throw err;
});

//fetch the largest Id for table memes (done at server boot only)
exports.getlastID = () => {
  
  return new Promise((resolve, reject) => {
    const sql = 'SELECT max(id) as lastID from MEMES';
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(err);
        undefined;
      }
      
      if (row.length === 0 || row === undefined) {
        resolve(0);
      }else{
        resolve(row.lastID);
      }
    });
  });
}



//return list of memes
exports.MemeList = (loggedIn) => {
    return new Promise((resolve, reject) => {
      let sql;
      if(loggedIn === false){
          sql = 'SELECT * FROM MEMES where visibility = 0';
      }else{
          sql = 'SELECT * FROM MEMES';
      }

      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const memes = rows.map((e) => ({
             id: e.id, title: e.title, imageId: e.imageId, visibility : e.visibility, font : e.font, color : e.color,
              c_name: e.c_name, c_id : e.c_id
          }));
        resolve(memes);
      });
    });
  };

//return list of memes by a certain creator
exports.CreatorMemes = (loggedIn, c_id) => {
    return new Promise((resolve, reject) => {
      let sql;
      if(loggedIn === false){
          sql = 'SELECT * FROM MEMES where visibility = 0 and c_id = ?';
      }else{
          sql = 'SELECT * FROM MEMES where c_id = ?';
      }

      db.all(sql, [c_id], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        if(rows.length === 0){
            reject({error: "Creator doesn't exist or has nothing to show you"});
        }
        const memes = rows.map((e) => ({
             id: e.id, title: e.title, imageId: e.imageId, visibility : e.visibility, font : e.font, color : e.color,
              c_name: e.c_name, c_id : e.c_id
          }));
        resolve(memes);
      });
    });
  };

//list of creators
exports.CreatorsList = () => {
    return new Promise((resolve, reject) => {
      const sql = 'select c_id, username from CREATORS';

      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const creators = rows.map((e) => ({
             c_id: e.c_id, username: e.username
          }));
        resolve(creators);
      });
    });
  };
//store a meme
exports.MemeStore = (meme) => {
    return new Promise((resolve, reject) => {
      const sql = 
      `INSERT INTO MEMES( title, imageId, visibility, font, color, c_name, c_id) 
      VALUES( ?, ?, ?, ?, ?, ?, ?)`;
      db.run(sql, [ meme.title, meme.imageId, meme.visibility, meme.font, meme.color, meme.c_name, meme.c_id], 
          function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };

//store a field of a meme
exports.FieldStore = (memeId, fieldId, field) => {
      return new Promise((resolve, reject) => {
      const sql = 
      `INSERT INTO TEXTFIELDS(meme_id, field_id, field) 
      VALUES(?, ?, ?)`;
      db.run(sql, [memeId, fieldId, field], 
          function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  };

//delete a meme from table MEMES
exports.deleteMeme = (memeId, loggedUserId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM MEMES WHERE id = ? and c_id = ?';
    db.run(sql, [memeId, loggedUserId], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}

//delete all fields of a Meme from TEXTFIELDS
exports.deleteField = (memeId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM TEXTFIELDS WHERE meme_id = ?';
      db.run(sql, [memeId], (err) => {
        if (err) {
          reject(err);
          return;
        } else
          resolve(null);
      });
    });
  }

//fetch main info for a single meme
exports.getMeme = (memeId, loggedIn) => {
  return new Promise((resolve, reject) => {
    let sql;
    if(loggedIn === true){
        sql = 'SELECT * FROM MEMES WHERE id=?';
    }else{
        sql = 'SELECT * FROM MEMES WHERE id=? and visibility = 0';
    }

    db.get(sql, [memeId], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        reject({error: 'Meme not found or is not visible to you.'});
      } else {
        const meme = { id: row.id, title: row.title, imageId: row.imageId, visibility : row.visibility, font : row.font,
             color : row.color, c_name : row.c_name,
            c_id: row.c_id };
        resolve(meme);
      }
    });
  });
};

//fetch textfields of a meme
exports.getFields = (memeId) => {
    return new Promise((resolve, reject) => {
      const sql = 'select field_id, field from TEXTFIELDS where meme_id = ?';

      db.all(sql, [memeId], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const fields = rows.sort((a,b) => a.field_id - b.field_id).map((e) => e.field);
        resolve(fields);
      });
    });
  };
