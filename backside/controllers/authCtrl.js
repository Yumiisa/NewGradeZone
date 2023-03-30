const Users = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const authCtrl = {
register: async (req,res)=>{
    try {
     const {fullname,username,email,password,gender} = req.body
    const newUsername = username.toLowerCase().replace(/ /g, "")
    const user_name= await Users.findOne({username:newUsername})
    if(user_name) { res.status(400).json({msg:"This username already exists"})
        return res}
    
    const userEmail=await Users.findOne({email:email})
    if(userEmail) {res.status(400).json({msg:"This email already exists"})
        return res} 
    
    if(password.length < 6) { res.status(400).json({msg:"Password must be at least 6 characters"});
    return res} 

    const passwordHash=await bcrypt.hash(password,13)

    const newUser = new Users({
        fullname,username:newUsername,email,password:passwordHash,gender
    })
    
    const access_token = createAccessToken({id:newUser._id})
    const refresh_token=createRefreshToken({id:newUser._id})

      res.cookie('refreshtoken', refresh_token,{
        httpOnly:true,
        path:'/api/refresh_token',
        maxAge:24*60*60*60*1000
      })

      await newUser.save()
     res.json({
        msg:"registered succesful",
        access_token,
        user:{
        ...newUser._doc,
        passwrd:""
        }
     })
    }catch(error){
        res.status(500).json({msg: error.message})
    }
},

login : async (req,res)=>{
    try {
        const{email,password}=req.body
        const user=await Users.findOne({email}).populate("friends following" , "-password")

        if(!user){
            res.status(400).json({msg :"User does not exist"})
            return res
        }
        const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch){
            res.status(400).json({msg :"User Password incorrect"})
            return res
        }
        const access_token = createAccessToken({id:user._id})
       const refresh_token=createRefreshToken({id:user._id})

      res.cookie('refreshtoken', refresh_token,{
        httpOnly:true,
        path:'/api/refresh_token',
        maxAge: 24*60*60*60*1000
      })

    
     res.json({
        msg:"login succesful",
        access_token,
        user:{
        ...user._doc,
        password:""
        }
     })
    }catch(error){
        res.status(500).json({msg: error.message})
    }
},
logout : async (req,res)=>{
    try {
     res.clearCookie('refreshtoken', {path:"/api/refresh_token"})
     res.json({msg:"Logged out"})
    }catch(error){
        res.status(500).json({msg: error.message})
    }
},
generateAccessToken: async (req,res)=>{
    try {
      const rf_token = req.cookies.refreshtoken;
      if(!rf_token)return res.status(400).json({msg:"Please login now"})

      jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,async(err,result)=>{
        if(err) return res.status(400).json({msg:"no"})
        const user = await Users.findById(result.id).select("-password").populate("friends following")

        if(!user) return res.status(400).json({msg:'user does not exist'})

         const access_token = createAccessToken({id: result.id})

         res.json({
            rf_token,
            access_token,
            user
            
         })
      })
    }catch(error){
        res.status(500).json({msg: error.message})
    }
}
}
const createAccessToken = (payload) => {
return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}
const createRefreshToken = (payload) => {
   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'}) 
}
module.exports = authCtrl