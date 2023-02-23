const mongoose = require('mongoose');// import mongoose

mongoose.connect('mongodb://localhost:27017/woke-advisory', {
    useNewUrlParser: true, useUnifiedTopology: true
});// connect to mongodb

const connection = mongoose.connection

connection.on('connected' , ()=>{
    console.log('🤑  Mongo db connection successfull 🤑')
})

connection.on('error' , ()=>{
    console.log(' 😈 Mongo db connection error 😈')
})


module.exports = mongoose.connection;