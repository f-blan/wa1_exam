'use strict';

const express = require('express')
const morgan = require('morgan')
const PORT = 3001;

const dao = require('./dao'); // module for accessing the DB
const userDao = require('./dao-users');

const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');

//initialize passport Strategy
passport.use(new passportLocal.Strategy((username, password, done) => {
  userDao.getUser(username, password).then(user => {
      if(user)
          done(null, user);
      else
          done(null, false, {message : 'Wrong username or password'});
  }).catch(err => {
      done(err);
  })
}));

//serialize and deserialize the user (just the id)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// Express initialization

const app = express();
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));

app.use(morgan('dev'));
app.use(express.json()); // parse the body in JSON format => populate req.body attributes


//initialize HTTP sessions
app.use(session({
    secret: 'BAEGroup-biglab2',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


//authentication middleware
const isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated())
        return next();
    
    return res.status(401).json({error : 'not authenticated'});
}

//POST /login
app.post('/api/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
      if (err)
          return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
      
          
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});
// DELETE /sessions/current 
// logout
app.delete('/api/logout', (req, res) => {
  req.logout();
  res.end();
});


//----------------------------------MEME SERVER API--------------------------------

app.get('/api/memes', async (req, res) => {
  
  try{
    let list = await dao.MemeList(req.isAuthenticated());
    res.json(list);
  }catch(error){
    res.status(500).json(error);
  }
  
  
});

app.get('/api/memes/:c_id', async (req, res) => {
  const c_id = req.params.c_id;
  try{
    let list = await dao.CreatorMemes(req.isAuthenticated(), c_id);
    res.json(list);
  }catch(error){
    res.status(500).json(error);
  }
  
  
});

app.get('/api/creators', async (req, res) => {
  try{
    let list = await dao.CreatorsList();
    res.json(list);
  }catch(error){
    res.status(500).json(error);
  }
  
  
});

app.post('/api/addMeme', isLoggedIn, async (req, res) => {
    
  const title = req.body.title;
  const imageId = req.body.imageId;
  const visibility = req.body.visibility;
  const font = req.body.font;
  const color = req.body.color;
  const c_name = req.user.username;
  const c_id = req.user.id;
  const fields = req.body.fields;
  try {
      
      let id = await dao.MemeStore({ title: title, imageId: imageId, 
          visibility : visibility, font: font, color: color, c_name: c_name, c_id : c_id});
      let fieldPromises = [];
      
      fields.forEach((f, i) => fieldPromises.push(dao.FieldStore(id,i,f)));
      await Promise.all(fieldPromises);
      
      

      res.json(id);
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
});


app.delete('/api/deleteMeme/:id', isLoggedIn, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
      let res1 = await dao.deleteMeme(id, userId);
      let res2 = await dao.deleteField(id);
      
      res.end();
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }

});

app.get('/api/retrieveMeme/:id', async (req, res) => {
  const id = req.params.id;
  try {
      let meme = await dao.getMeme(id, req.isAuthenticated());
      meme.fields = await dao.getFields(id);

      res.json(meme);
  } catch (error) {
      res.status(500).json(error);
  }

});

app.get('/api/session', isLoggedIn, (req, res) =>{
  if(req.isAuthenticated)
      res.status(200).json(req.user);
  else
      res.status(401).json({error : 'Unauthenticated!'});
});