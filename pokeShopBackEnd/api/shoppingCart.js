const express = require('express');
const { getPurchasedCartByUserId } = require('../db');
const { getShoppingCartByUserId } = require('../db');
const cartRouter = express.Router();

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart");
    next();
});

cartRouter.get('/', async (req,res,next) => {
    try{
        //this should only trigger if something is wrong in frontend
        //guests should be able to use localStorage to store shopping carts
        if(!req.user){
            res.send({
                error:"Unauthorized",
                message:"you need to login to do this action"
            })
        }

        const cart = await getShoppingCartByUserId(req.user.id)
        res.send({
            cart
        })
    } catch({name, message}) {
        next({name, message})
    }
})

cartRouter.get('/history', async (req,res,next) => {
    try{
        if(!req.user){
            res.send({
                error:"Unauthorized",
                message:"you need to login to do this action"
            })
        }

        const cart = await getPurchasedCartByUserId(req.user.id)
        res.send({
            cart
        })
    } catch({name, message}) {
        next({name, message})
    }
})

cartRouter.post('/update', async (req,res,next) => {
    try{
        if(!req.user){
            res.send({
                error:"Unauthorized",
                message:"you need to login to do this action"
            })
        }

        const {id, productsList} = req.body

        const cart = await updateShoppingCart({id, productsList})

        res.send({
            cart
        })
    } catch({name, message}) {
        next({name, message})
    }
})

module.exports = cartRouter;