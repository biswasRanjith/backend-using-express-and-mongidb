require('dotenv').config();
const express = require ('express');
const app = express()
var mongoose = require('mongoose');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var cors = require('cors');
var bodyParser = require('body-parser')
var db = require('./config/database.js');
app.use(cors());
app.use(express.json());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./model/user.js');
const Devices = require('./model/devices');
const Status = require('./model/status');
var port = 5000;


const users=[];

let refreshTokens = []



function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}


app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})



app.get('/users',authenticateToken, (req, res) => {
  res.json(users)
})

app.post('/registerUsers', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword, email: req.body.email }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/login', async (req, res) => {
  const user = users.find(user => user.email === req.body.email)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
     
  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
    
     //res.send('Success user is valid'      

    } else {
      res.send('User is invalid')
    }
  } catch {
    res.status(500).send()
  }
})




app.get('/devices',authenticateToken,  async (req,res)=>{
  
     Devices.find(function (err, name){
      return res.json(name)
     })
// var query = Devices.find({}).stream();

// query.on('data', function (doc) {
//     return res.json(doc);
// }).on('error', function (err) {
//     return res,json(err)
// }).on('close', function () {
//     // the stream is closed
// });

// Devices.countDocuments({}, function (err, count) {
  
//       console.log(count);
//   })

   
});


app.get('/deviceslocs/:deviceId',authenticateToken, async (req,res)=>{
  const deviceId = req.params.deviceId
  const { page, perPage } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
  };
const status = await Status.paginate({device: deviceId}, options);
return res.json(status);

})



app.listen(port, () => console.log("server started on port" + port));

module.exports = app;