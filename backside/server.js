require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const { parse } = require('dotenv');
const cookieParser=require('cookie-parser')
const authRouter=require('./routers/authRouter')
const userRouter=require('./routers/userRouter')

const app = express()

app.use(express.json()) //for body parsing
app.use(cors());
app.use(cookieParser())

//route
app.use('/api',authRouter)
app.use('/api',userRouter)

const port = process.env.Port || 5000;
const URL=process.env.MONGO_URI;

mongoose.connect(URL,{
    useNewUrlParser: true, 
   useUnifiedTopology: true 
}).then(()=>{
    console.log('db connection established')
}).catch(err=>console.log(err))



app.listen(port,() => {
    console.log("app is running")
})