const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {type:String},
    mobileNumber : {type:Number},
    password : {type:String}
});


module.exports = mongoose.model('users',userSchema);