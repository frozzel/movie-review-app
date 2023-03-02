const nodemailer = require('nodemailer');// import nodemailer
const { EMAILUSER, EMAILPASS } = require('../config/env.js');// import config

exports.genOPT = (otp_len= 6 ) => {

  let OTP = ""
  for (let i = 1; i <= otp_len; i++) {
      randnum = Math.round(Math.random() * 9)
      OTP += randnum
  }
  return OTP
}

exports.genTransporter = () => 
     nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: EMAILUSER,
          pass: EMAILPASS
        }
      });

