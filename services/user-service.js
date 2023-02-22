const express = require("express");
const app = express();
const userMaster = require("../models/userMaster");
const router = express.Router();
const { response } = require("express");
const { connection } = require("mongoose");
app.use(express.json());

module.exports = {
  RegisterUser: async function (req, res) {
    console.log("bulaale");
    let userObj = req.body;
    let data ;
    try {
       data = await userMaster
        .create({
          userName: userObj.userName,
          mobileNumber: userObj.mobilenumber,
          password: userObj.password,
        })
        .then((results) => {
          console.log(results);
          return JSON.parse(JSON.stringify(results));
        })
        .catch((e) => {
          console.log(e);
        });

        data["statusCode"] = '0';
        data["statusMessage"] = 'Success';

        
    } catch (e) {
        console.log(e);   
        data.statusCode = '1';
        data.statusMessage = 'Failed';
        data.error = e;  
    }
    console.log('data',data);
    res.json(data);
  },
  LoginUser: async function (req, res) {
    console.log("bulaale");
    let userObj = req.body;
    let data ;
    var response = {};
    try {
       data = await userMaster
        .findOne({
          mobileNumber: userObj.mobileNumber,
          password: userObj.password,
        }).exec()
        .then((results) => {
          console.log(results);
          return JSON.parse(JSON.stringify(results));
        })
        .catch((e) => {
          console.log(e);
        });
        if(data){
          response.data = data;
          response["statusCode"] = '0';
          response["statusMessage"] = 'Success';
        }else{
          response.data = data;
          response["statusCode"] = '1';
          response["statusMessage"] = 'Credentials not found';
        }

        
    } catch (e) {
        console.log(e);   
        response.statusCode = '1';
        response.statusMessage = 'Failed';
        response.error = e;  
    }
    console.log('data',response);
    res.json(response);
  },
  DownloadUser: async function (req, res) {
    console.log("bulaale");
    let userObj = req.body;
    let data ;
    let response = {};
    try {
       data = await userMaster
        .find().exec()
        .then((results) => {
          console.log(results);
          return JSON.parse(JSON.stringify(results));
        })
        .catch((e) => {
          console.log(e);
        });

        response["statusCode"] = '0';
        response["statusMessage"] = 'Success';
        response["data"] = data;

        
    } catch (e) {
        console.log(e);   
        response.statusCode = '1';
        response.statusMessage = 'Failed';
        response.error = e;  
    }
    console.log('data',data);
    res.json(response);
  },
};
