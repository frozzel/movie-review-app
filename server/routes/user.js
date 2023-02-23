const express = require('express'); // import express
const {userValidator, validate } = require('../utils/auth');//    import user validator
const { create } = require('../controllers/user');//    import user controller


const router = express.Router()// create a router

router.post('/create', userValidator, validate, create)// define a route handler for the default home page


module.exports = router;// export router