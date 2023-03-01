const express = require('express'); // import express
const userRouter = require('./routes/user');// import user router
require('./config/connections')


const app = express();// create express app
app.use(express.json())// parse json request body
app.use('/api/user', userRouter);// use user router

PORT = 3000// define a port

app.get('/', (req, res) => {// define a route handler for the default home page
    res.send('Hello World!')// send some response
})

app.post('/sign-in', (req, res, next) => {// define a route handler for the default home page
    const {email, password} = req.body;
    if (!email || !password) 
    return res.status(400).json({error: 'Please provide email and password'})
    next();
},
(req, res) => {
    res.send('Succsess! Sign In Page')// send some response
});


app.listen(PORT,  () => {// start express server on port 3000
    console.log(`🚀 Server running on port http://localhost:${PORT},🚀`)
    
})
