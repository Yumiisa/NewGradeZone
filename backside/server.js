require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const { parse } = require('dotenv');
const bcrypt=require('bcrypt')
const cookieParser=require('cookie-parser')

const app = express()

app.use(express.json()) //for body parsing
app.use(cors());
app.use(cookieParser())

const port = process.env.Port || 5000;
const URL=process.env.MONGO_URI;

mongoose.connect(URL,{}).then(()=>{
    console.log('')
}).catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.status(500).send("I love you ted")
});

app.listen(port,() => {
    console.log("app is running")
})