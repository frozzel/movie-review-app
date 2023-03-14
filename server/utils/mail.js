const nodemailer = require('nodemailer');// import nodemailer
const { EMAILUSER, EMAILPASS } = require('../config/env.js');// import config

exports.generateOPT = (otp_len= 6 ) => {

  let OTP = ""
  for (let i = 1; i <= otp_len; i++) {
      randnum = Math.round(Math.random() * 9)
      OTP += randnum
  }
  return OTP
}

exports.generateMailTransporter = () => 
     nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: EMAILUSER,
          pass: EMAILPASS
        }
      });

