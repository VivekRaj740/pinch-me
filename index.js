const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('./database/db');
const bodyParser = require('body-parser');
const chatService = require('./services/chat-service');
app.use(cors('*'));
let server = app.listen(3000);
const io = require('socket.io')(server, {
    cors:{
        options:['http://localhost:8100']
    }
})
// const io = require('socket.io')(3000,{
//     cors:{
//         options:['http://localhost:8100']
//     }
// })

app.use(bodyParser.json())

app.use("/", require("./route/router"));
io.on('connection', (socket) => {
  console.log('called')
    socket.on('disconnect', function(){
      io.emit('usersActivity', {
        user: socket.username,
        event: 'chatLeft'
      });
    });
   
    socket.on('join-myRoom', (mine,their) => {
        let room = Number(mine) > Number(their) ? mine+their : their+mine;
        socket.join(room);
        // socket.join(their);
        // socket.join('1');
    });
    // socket.on('join-oneToOne', (mobileNumber) => {
    //     socket.join(room);
    //     socket.join('1');
    // });
    // socket.on('setUserName', (name) => {
    //   socket.username = name;
    //   io.emit('usersActivity', {
    //     user: name,
    //     event: 'chatJoined'
    //   });    
    // });
    
    // socket.on('sendTheMessage', (message) => {
    //   io.emit('message', {
    //     msg: message.text,
    //     user: socket.username,
    //     createdAt: new Date()
    //   });    
    // });
    socket.on('sendMessage',async (messageObject) => {
      let response = await chatService.SaveMessage(messageObject);
      if(response.statusCode == '0'){
        let mine = (messageObject.from).toString();
        let their = (messageObject.to).toString();
        let room = messageObject.from > messageObject.to ? mine+their : their+mine;
        socket.to(room).emit('message', {
            message: messageObject.message,
            from:messageObject.from,
            to:messageObject.to,
            createdAt: new Date()
          }); 
          let obj = {
            message: messageObject.message,
            from:messageObject.to,
            to:messageObject.from,
            createdAt: new Date()
          }
        //   let response = await chatService.SaveMessage(obj);
      }
         
    });

  });
