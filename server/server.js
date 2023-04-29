const express = require('express'); // import express
require('express-async-errors'); // import express-async-errors
const morgan = require('morgan')    // import morgan
const {errorHandler} = require('./utils/error')// import error handler
require('dotenv').config()// import dotenv
require('./config/connections')//   import database connection

const userRouter = require('./routes/user');// import user router
const actorRouter = require('./routes/actor');// import user router
const movieRouter = require('./routes/movie');// import user router
const cors = require('cors'); // import cors (cross origin resource sharing) can also be done in the client side with proxy
const { handleNotFound } = require('./utils/helper');


const app = express();// create express app
app.use(cors())
app.use(express.json())// parse json request body
app.use(morgan('dev'))// log http requests



app.use('/api/user', userRouter);// use user router
app.use('/api/actor', actorRouter);// use user router
app.use('/api/movie', movieRouter);// use user router

app.use('/*', handleNotFound) // catch 404 and forward to error handler


app.use(errorHandler)// use error handler


PORT = 4000// define a port


app.listen(PORT,  () => {// start express server on port 3000
    console.log(`..............................................`)
    console.log(`🚀 Server running on port http://localhost:${PORT},🚀`)
    console.log(`..............................................`)
    console.log(`...............Starting Database...............`)
   
    
})
