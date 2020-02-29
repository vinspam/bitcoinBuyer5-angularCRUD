
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken'); 

// 2.12 :: works
const db = `mongodb://thomas:${pw}@cluster1-shard-00-00-jgrue.mongodb.net:27017,cluster1-shard-00-01-jgrue.mongodb.net:27017,cluster1-shard-00-02-jgrue.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin&retryWrites=true&w=majority`;
console.log(db)

// 3.0 :: no work
//mongodb+srv://thomas:<password>@cluster1-jgrue.mongodb.net/test?retryWrites=true&w=majority
// mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
  if (err) {
    console.error('Error! ' + err)
  } else {
    console.log('Connected to mongodb')
  }
});
function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/coins', (req,res) => {
  let coins = [
    {
      "_id": "1",
       "Date": "2019/07/04",
       "Symbol": "BTCUSD",
       "Open": 11976.42,
       "High": 12064.26,
       "Low": 11820,
       "Close": 11909.55,
       "Volume BTC": 1237.57,
       "Volume USD": 14790355.69
     },
     {
       "_id": "2",
       "Date": "2019/07/03",
       "Symbol": "BTCUSD",
       "Open": 10829.18,
       "High": 12014.6,
       "Low": 10829.18,
       "Close": 11976.42,
       "Volume BTC": 36836.85,
       "Volume USD": 419076229.34
     },
     {
       "_id": "3",
       "Date": "2019/07/02",
       "Symbol": "BTCUSD",
       "Open": 10577.63,
       "High": 10925,
       "Low": 9651,
       "Close": 10829.18,
       "Volume BTC": 41476.42,
       "Volume USD": 424791613.92
     },
     {
       "_id": "4",
       "Date": "2019/07/01",
       "Symbol": "BTCUSD",
       "Open": 10761.26,
       "High": 11210.52,
       "Low": 9953,
       "Close": 10577.63,
       "Volume BTC": 37633.9,
       "Volume USD": 396857365.17
     }
  ]
  res.json(coins)
})

router.get('/member-altcoins', verifyToken, (req, res) => {
  let memberAltcoins = [ 
    {
      "_id": "1",
      "Date": "2019/07/04",
      "Symbol": "ETHUSD",
      "Open": 301.79,
      "High": 304,
      "Low": 300.39,
      "Close": 301.5,
      "Volume ETH": 3825.69,
      "Volume USD": 1154988.12
    },
    {
      "_id": "2",
      "Date": "2019/07/03",
      "Symbol": "ETHUSD",
      "Open": 291.25,
      "High": 303.83,
      "Low": 289.61,
      "Close": 301.79,
      "Volume ETH": 105691.96,
      "Volume USD": 31264397.55
    },
    {
      "_id": "3",
      "Date": "2019/07/02",
      "Symbol": "ETHUSD",
      "Open": 293.7,
      "High": 296.24,
      "Low": 270.42,
      "Close": 291.25,
      "Volume ETH": 218010.42,
      "Volume USD": 61564550.93
    },
    {
      "_id": "4",
      "Date": "2019/07/01",
      "Symbol": "ETHUSD",
      "Open": 290.07,
      "High": 301.32,
      "Low": 278.65,
      "Close": 293.7,
      "Volume ETH": 184436.14,
      "Volume USD": 53230192.12
    }
  ]
  res.json(memberAltcoins)
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

module.exports = router;
