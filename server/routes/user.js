const express = require('express'); // import express
const { createUser } = require('../controllers/user');
const router = express.Router()// create a router

router.post('/user-create', createUser)


module.exports = router;// export router