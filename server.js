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

