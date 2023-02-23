const User = require('../models/user');// import user model


exports.create = async (req, res) => {
    const {name, email, password} = req.body;
    const oldUser = await User.findOne({email});
    if(oldUser) return res.status(401).json({error: 'User already exists'});
    const newUser = new User({name, email, password});
    await newUser.save();
    res.status(201).json({user: newUser})
}

