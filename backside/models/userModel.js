const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        maxlength:25,
        required:true
    },

    fullname:{
        type:String,
        trim:true,
        max:25,
        maxlength:25,
    },

    email:{
        type:String,
        trim:true,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    address:{
        type:String,
        default:''
    },

    website:{
        type:String,
        default:''
    },

    gender:{
        type:String,
        default:'Male'
    },

    phone:{
        type:String,
        default:''
    },

    story:{
        type:String,
        default:'',
         maxlength:250,
    },
    avatar:{
        type:String,
        default:''
    },

    friends:[{type:mongoose.Types.ObjectId,ref:"user"}],
    following:[{type:mongoose.Types.ObjectId,ref:"user"}]
},
{
    timestamps:true
})
module.exports = mongoose.model('user',userSchema)