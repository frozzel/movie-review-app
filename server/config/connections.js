const mongoose = require('mongoose');// import mongoose
mongoose.set('strictQuery', true)

mongoose.connect('mongodb://localhost:27017/woke-advisory').// connect to mongodb
    then(()=>{
        console.log('🤑🤑🤑  Mongo db connection successfull  🤑🤑🤑');// log success
    })
    .catch((err)=>{
        console.log('😈😈😈     Mongo db connection error     😈😈😈', err);// log error
    });
