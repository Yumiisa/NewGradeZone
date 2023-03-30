const Users = require('../models/userModel')

const userCtrl = {
  searchUser: async (req,res) =>{
    try{
       
        const users = await Users.find({username: {$regex:req.query.username}}).limit(10)
        .select("fullname username avatar")

        res.json({users})
    }catch(err){
         return res.status(500).json({msg:err.message})
    }
   
  },

     getUser: async (req,res) =>{
    try{
       
        const user = await Users.findOne({_id : req.params._id})
        .select("-password")
        if(!user) return res.status(400).json({msg:'No user Exists'})

        res.json({user})
    }catch(err){
         return res.status(500).json({msg:err.message})
    }
   
  }
}
 module.exports = userCtrl