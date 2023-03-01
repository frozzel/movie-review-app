const User = require('../models/user');// import user model
const EmailVerificationToken = require('../models/email_verification');// import email verification model
const nodemailer = require('nodemailer');// import nodemailer
const { isValidObjectId } = require('mongoose');
const { genOPT, genTransporter } = require('../utils/mail');
const { sendError } = require('../utils/helper');

exports.create = async (req, res) => {
    const {name, email, password} = req.body;
    const oldUser = await User.findOne({email});

    if(oldUser) return sendError(res, 'User already exists');
    
    const newUser = new User({name, email, password});
    await newUser.save();
    
    //create a token thats random
    let OTP = genOPT()
    
    // store token in database
    const newEmailVerificationToken = new EmailVerificationToken({ owner: newUser._id, token: OTP })

    await newEmailVerificationToken.save()
  
    // send email
    var transport = genTransporter();


      transport.sendMail({
        from: 'verification@WokeAdvisory.com',
        to: newUser.email,
        subject: 'Email Verification',
        html: `<h1>Woke Advisory</h1>
        <p>Thank you for signing up with Woke Advisory. </p>
        <p>Please verify your email address by entering the following code on the verification page.</p>
        <h2>${OTP}</h2>
            <p>Thank you for choosing Woke Advisory.</p>`


      })
    res.status(201).json({message: "Please check your email for verification code"})
}

exports.verifyEmail = async (req, res) => {
    const {userId, OTP} = req.body;

    if(!isValidObjectId(userId)) return sendError(res, "Invalid user id");

    const user = await User.findById(userId);
    if(!user)return sendError(res, "User does not exist", 404);

    if (user.isVerified) return sendError(res, "User is already verified");

    const token = await EmailVerificationToken.findOne({owner: userId});
    if(!token) return sendError(res, "Token does not exist");

    const isMatched = await token.compareToken(OTP);
    
    if(!isMatched) return sendError(res, "Invalid OTP");

    user.isVerified = true;
    await user.save();
    
    await EmailVerificationToken.findByIdAndDelete(token._id);

    var transport = genTransporter();


      transport.sendMail({
        from: 'verification@WokeAdvisory.com',
        to: user.email,
        subject: 'Welcome to Woke Advisory',
        html: `<h1>Woke Advisory</h1>
        <p>Thank you for verifying your email address. </p>`


      })
    res.json({message: "User verified successfully"});
};

exports.resendEmailVerificationToken = async (req, res) => {
    const {userId} = req.body;
    const user = await User.findById(userId);

    if (!user) return sendError(res, "User does not exist");

    if (user.isVerified) return sendError(res, "User is already verified");

    const alreadhasToken = await EmailVerificationToken.findOne({owner: userId});
    if(alreadhasToken) return sendError(res, "Token already exists");

    //create a token thats random
    let OTP = genOPT()
    
    // store token in database
    const newEmailVerificationToken = new EmailVerificationToken({ owner: user._id, token: OTP })

    await newEmailVerificationToken.save()
  
    // send email
    var transport = genTransporter();


      transport.sendMail({
        from: 'verification@WokeAdvisory.com',
        to: user.email,
        subject: 'Email Verification',
        html: `<h1>Woke Advisory</h1>
        <p>Thank you for signing up with Woke Advisory. </p>
        <p>Please verify your email address by entering the following code on the verification page.</p>
        <h2>${OTP}</h2>
            <p>Thank you for choosing Woke Advisory.</p>`


      })
    res.status(201).json({message: "Please check your email for verification code"})
}

    