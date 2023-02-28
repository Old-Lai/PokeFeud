const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const {createUser, updateUser, getUserByUsername} = require('../db');
usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
  res.send({})
    next(); // THIS IS DIFFERENT
  }); 
  usersRouter.post('/register', async (req, res, next) => {
    const { username, password, name, location } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
  
      const user = await createUser({
        username,
        password,
        name,
        location,
      });
  
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
  
      res.send({ 
        message: "thank you for signing up",
        token 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });

  
module.exports = usersRouter;