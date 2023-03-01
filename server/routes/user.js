const express = require('express'); // import express
const { userValidtor, validate} = require('../utils/auth');
const { create, verifyEmail, resendEmailVerificationToken } = require('../controllers/user');//    import user controller



const router = express.Router()// create a router

router.post('/create', userValidtor, validate, create)// define a route handler for the default home page

router.post('/verify-email', verifyEmail)// define a route handler for the default home page

router.post('/resend-email-verification-token', resendEmailVerificationToken)// define a route handler for the default home page

module.exports = router;// export router