const OtpModel = require('../models/otp')
const { otpVerification } = require('../helpers/otpValidate')

const otpGenerator = require('otp-generator')
const twilio = require('twilio')

const accountsid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioClient = new twilio(accountsid, authToken)

const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    })
    const cDate = new Date()
    await OtpModel.findOneAndUpdate(
      { phoneNumber },
      { otp, otpExpiration: new Date(cDate.getTime()) },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )

    await twilioClient.messages.create({
      body: `Your OTP is: ${otp}`,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    })

    return res.status(200).json({
      sucess: true,
      msg: 'OTP send successfully !! ' + otp,
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      msg: error.message,
    })
  }
}

const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body

    const otpData = await OtpModel.findOne({
      phoneNumber,
      otp,
    })

    if (!otpData) {
      return res.status(400).json({
        sucess: false,
        msg: 'Invalid OTP',
      })
    }
    const isOtpExpired = otpVerification(otpData.otpExpiration)
    if (isOtpExpired) {
      return res.status(400).json({
        sucess: false,
        msg: 'Your OTP has been expired',
      })
    }
    return res.status(200).json({
      sucess: true,
      msg: 'OTP Verified successfully',
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      msg: error.message,
    })
  }
}

module.exports = {
  sendOtp,
  verifyOtp,
}
