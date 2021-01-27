const router=require('express').Router();
//get the model for db calls
const PostDb=require('./posts-model');
const {validateId,validateBody}= require('./middleware');

router.get('/',async (req,res,next)=>{
   try {
       const posts= await PostDb.get();
       res.status(200).json(posts);
   } catch (err) {
       next(err)
   }
})

router.get('/:id', validateId, async (req,res,next)=>{
    try {
        res.status(200).json(req.post)
    } catch (err) {
        next(err)
    }
    
})

router.post('/', validateBody, async (req,res,next)=>{
    try {
        const post= await PostDb.create(req.body)
        res.status(201).json(post)  
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateId,validateBody, async(req,res,next)=>{
    try {
        const updatedId= await PostDb.update(req.params.id,req.post)
        res.status(200).json({updateCount: updatedId}) 
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateId,  async (req,res,next)=>{
    try {
        const removed= await PostDb.remove(req.params.id)
     
        if(removed === 1){
            res.status(200).json({message: "removed successful!"})
        }else res.status(400).json({message: "unable to delete"})
    } catch (err) {
        next(err)
    }
})
module.exports=router;

