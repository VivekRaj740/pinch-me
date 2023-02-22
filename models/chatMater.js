const mongoose =  require('mongoose');

const chatSchema = new mongoose.Schema({
    from : {type:Number},
    to : {type:Number},
    message : {type:String},
});


module.exports = mongoose.model('chats',chatSchema);