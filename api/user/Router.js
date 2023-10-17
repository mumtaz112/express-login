const express = require('express')
const router = express.Router();
const {getuserfrofile , login , signup} = require('../User/Controller')

router.get('/getuserprofile',getuserfrofile) 
router.post('/login',login)
router.post('/signup',signup)

module.exports=router;