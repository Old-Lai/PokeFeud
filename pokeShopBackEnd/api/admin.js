const express = require("express");
const adminRouter = express.Router();
const { getAllUsers } = require("../db");

adminRouter.get("/users", async (req, res, next) => {
  try {
    if(!req.user){
      return res.status(401).json({
        error:"Unauthorized",
        message:"you need to be logged in"
      });
    } else if(!req.user.isAdmin){
      return res.status(401).json({
        error:"Unauthorized",
        message:"you need to be an admin to do this action"
      });
    }
    const users = await getAllUsers();
    res.send({users})
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/users", async (req, res, next) => {
  try{
    if(!req.user){
      return res.status(401).json({
        error:"Unauthorized",
        message:"you need to be logged in"
      });
    } else if(!req.user.isAdmin){
      return res.status(401).json({
        error:"Unauthorized",
        message:"you need to be an admin to do this action"
      });
    }

    const {isAdmin} = req.body


    const user = updateUser(id,{isAdmin:(isAdmin? true : false)})
    res.send({user})
  } catch(err) {
    next(err)
  }
})
  
module.exports = adminRouter;
