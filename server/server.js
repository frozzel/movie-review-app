const express = require('express'); // import express
require('express-async-errors'); // import express-async-errors
const morgan = require('morgan')    // import morgan
const {errorHandler} = require('./utils/error')// import error handler
require('dotenv').config()// import dotenv
require('./config/connections')//   import database connection
const userRouter = require('./routes/user');// import user router


const app = express();// create express app
app.use(express.json())// parse json request body
app.use(morgan('dev'))// log http requests
app.use('/api/user', userRouter);// use user router

app.use(errorHandler)// use error handler

// app.use((err, req, res, next) => {
//     console.log("err: ", err)
//     res.status(500).json({error: err.message || 'Something went wrong'})
// })


PORT = 4000// define a port


// app.post('/sign-in', (req, res, next) => {// define a route handler for the default home page
//     const {email, password} = req.body;
//     if (!email || !password) 
//     return res.status(400).json({error: 'Please provide email and password'})
//     next();
// },
// (req, res) => {
//     res.send('Success! Sign In Page')// send some response
// });


app.listen(PORT,  () => {// start express server on port 3000
    console.log(`..............................................`)
    console.log(`🚀 Server running on port http://localhost:${PORT},🚀`)
    console.log(`..............................................`)
    console.log(`...............Starting Database...............`)
   
    
})
