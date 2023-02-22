const express = require('express');
const router = express.Router();
const chatService = require('../services/chat-service');

router.post('/',(req,res)=>{
    console.log('halle looya');
    chatService.DownloadChats(req,res);
});
router.post('/allchats',(req,res)=>{
    console.log('halle looya');
    chatService.DownloadAllChats(req,res);
});

// router.post('/contacts',(req,res)=>{
//     console.log('halle looya');
//     userService.DownloadUser(req,res);
// });


module.exports = router;