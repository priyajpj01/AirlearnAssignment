// run server using node index.js

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const app=express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const userRouter = require('./Routes/userRoute');
const examRouter = require('./Routes/examRoute');
require('./models/user');
require('./models/exam');


mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true },
    { useUnifiedTopology: true } );


app.use(userRouter)
app.use(examRouter)
app.listen(3000,()=>
{
    console.log("Server listening")
})