const express = require('express');
const router = express.Router();
const userService = require('../services/user-service');

router.post('/',(req,res)=>{
    console.log('halle looya');
    userService.RegisterUser(req,res);
});
router.post('/login',(req,res)=>{
    console.log('halle looya');
    userService.LoginUser(req,res);
});

router.post('/contacts',(req,res)=>{
    console.log('halle looya');
    userService.DownloadUser(req,res);
});


module.exports = router;