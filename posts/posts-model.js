const postsDb= require('../data/config') //this config file has the instance of knex that can interact with db

async function get(){
    const postList= await postsDb("messages")
    return postList
}

async function getById(id){
 const [post]= await postsDb("messages").where({id})
 return post;
}

async function create(body){
// const postId= await postsDb.insert(body).into('messages')
const [postId]= await postsDb("messages").insert(body);
const result= await getById(postId);
return result;
}

async function update(id,body){
const updatedId= await postsDb("messages").where({id}).update(body)
return updatedId;
}

async function remove(id){
 const removed= await postsDb("messages").where({id}).del();
 return removed;
}
module.exports={get,
getById,
create,
update,
remove}