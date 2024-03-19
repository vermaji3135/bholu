require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/otpdb')

const express = require('express')
const app = express()

const port = process.env.SERVER_PORT || 3000

const userRoute = require('./routes/userRoute')

app.use('/api', userRoute)

app.listen(port, function () {
  console.log(`App running on port ${port}`);
})
// const server = app.listen(0, () => {
//   const port = server.address().port;
//   console.log(`App running on port ${port}`);
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// const express = require('express'); // Import Express

// const app = express(); // Define the app instance

// // Your other code using app
// app.use('/api', userRoute); // Use app after it's defined

//sdfgsdfgfdfghdfghfdhdfgsdfgsfgdfg



// // Import required modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const otpGenerator = require('otp-generator');
// const twilio = require('twilio');

// // Load environment variables from .env file
// dotenv.config();

// // Create an Express application
// const app = express();

// // Parse incoming request bodies in JSON format
// app.use(bodyParser.json());

// // Define your routes
// // For example:
// // const userRoute = require('./routes/userRoute');
// // app.use('/api', userRoute);

// // Define a sample route
// app.get('/api/sample', (req, res) => {
//     res.json({ message: 'Sample route response' });
// });

// // Define your Twilio integration for sending OTP
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

// // Define route to send OTP
// app.post('/api/sendotp', (req, res) => {
//     const { phoneNumber } = req.body;
//     const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    
//     client.messages
//         .create({
//             body: `Your OTP is: ${otp}`,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: phoneNumber
//         })
//         .then(() => {
//             res.json({ success: true, message: 'OTP sent successfully' });
//         })
//         .catch((error) => {
//             console.error('Error sending OTP:', error);
//             res.status(500).json({ success: false, error: 'Failed to send OTP' });
//         });
// });

// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// const server = app.listen(0, () => {
//   const port = server.address().port;
//   console.log(`App running on port ${port}`);
// });