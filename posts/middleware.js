const express=require('express');
const postsDb= require('../data/config');
const PostDb= require('./posts-model');

async function validateId(req,res,next){
    try {
        const post= await PostDb.getById(req.params.id)
        if (post){
            req.post=post; 
            next();
        }else{
            const err = new Error("Sorry, Invalid Id");
            err.statusCode=404;
            next(err);
        }                
    } catch (err) {
        next(err)
    }
}

function validateBody(req,res,next){
    const body= req.body;
    if(!body.title || !body.contents){
        res.status(400).json({message: "Please provide title and contents"})
    }else{
         next()
    }
}


module.exports={validateId,validateBody}