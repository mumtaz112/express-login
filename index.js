const express = require('express');
const app = express();

require('dotenv').config();

const mongooes=require('mongoose');

const port = process.env.PORT || 5000;


app.use(express.json())

app.use('/api', require('../express-login/api/user/Router'))
mongooes.connect(process.env.MONGO_URL)
.then(()=>{console.log("Connected")})
.catch((err)=>{console.log("Error")})

app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
