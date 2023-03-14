const express = require("express");
const { create, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword } = require("../controllers/user");
const { isValidPassResetToken } = require("../utils/user");
const { userValidtor, validate, validatePassword } = require("../utils/auth");

const router = express.Router();

router.post("/create", userValidtor, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post('/forget-password', forgetPassword)
router.post('/verify-pass-reset-token', isValidPassResetToken, sendResetPasswordTokenStatus)
router.post('/reset-password', validatePassword, validate, isValidPassResetToken, resetPassword)

module.exports = router;