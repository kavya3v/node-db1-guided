const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        // knex lib returns promises- so we can await them
       const messages= await db.select("*").from("messages");
       res.json(messages);
        
    } catch (err) {
       next(err) 
    }

})

router.get("/:id", async (req, res, next) => {
 
try {
    //select statments always return array of rows so result will be an array with just one object here
    //we can destructure and send just the obj instead!
    //but have as array as when id not found needs to be empty array or handle it if destructured as array. Coz it wl be undefined if array length 0
    const [message]= await db.select("*")
                           .from("messages")
                           .where("id",req.params.id)
                           .limit(1);
    if(message){
        res.json(message);
    }else res.status(200).json({message: "id not found"})
     
} catch (err) {
    next(err)
}
})

router.post("/", async (req, res, next) => {
try {
    const [postId]= await  db.insert({
        title:req.body.title,
        contents:req.body.contents
    })
    .into("messages");
    //grab that id and get that whole obj
    // const [newMsg]= await db.select("*").from("messages").where("id",postId).limit(1);
    const newMsg= await db("messages")
                .where("id",postId)
                .first(); //same as limit(1)
    res.status(201).json(newMsg);
} catch (err) {
    next(err)
}
})

router.put("/:id", async (req, res, next) => {
try{
const updatedId= await db("messages")
                .update({
                title:req.body.title,
                contents:req.body.contents})
                .where("id",req.params.id);
    const [updatedMsg]= await db("messages")
                        .where("id",req.params.id);
    res.status(200).json(updatedMsg);
}catch(err){
next(err)
}
})

router.delete("/:id", async (req, res, next) => {
try {
    const deletedId= await db("messages")
    .where("id",req.params.id)
    .del();
    res.status(204).json({message: 'successful delete'})
} catch (err) {
    next(err)
}
})

module.exports = router