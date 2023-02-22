const express = require("express");
const app = express();
const chatMaster = require("../models/chatMater");
const router = express.Router();
const { response } = require("express");
const { connection } = require("mongoose");
const userMaster = require("../models/userMaster");
app.use(express.json());

module.exports = {
  SaveMessage: async function (messageObj) {
    console.log("bulaale");
    // let userObj = req.body;
    let data;
    try {
      data = await chatMaster
        .create({
          from: messageObj.from,
          to: messageObj.to,
          message: messageObj.message,
        })
        .then((results) => {
          console.log(results);
          return JSON.parse(JSON.stringify(results));
        })
        .catch((e) => {
          console.log(e);
        });

      data["statusCode"] = "0";
      data["statusMessage"] = "Success";
    } catch (e) {
      console.log(e);
      data.statusCode = "1";
      data.statusMessage = "Failed";
      data.error = e;
    }
    console.log("data", data);
    return data;
    // res.json(data);
  },
  DownloadChats: async function (req, res) {
    console.log("bulaale");
    let userObj = req.body;
    let data;
    let response = {};
    try {
      data = await chatMaster
        .find({
          $or: [
            { from: req.body.usersMobile, to: req.body.contactsMobile },
            { from: req.body.contactsMobile, to: req.body.usersMobile },
          ],
        })
        .exec()
        .then((results) => {
          console.log(results);
          return JSON.parse(JSON.stringify(results));
        })
        .catch((e) => {
          console.log(e);
        });

      response["statusCode"] = "0";
      response["statusMessage"] = "Success";
      response["data"] = data;
    } catch (e) {
      console.log(e);
      response.statusCode = "1";
      response.statusMessage = "Failed";
      response.error = e;
    }
    console.log("data", data);
    res.json(response);
  },
  DownloadAllChats: async function (req, res) {
    console.log("bulaale");
    let userObj = req.body;
    let data = [];
    let response = {};
    try {
      let from = await chatMaster
        .find(
          {
            $or: [{ from: req.body.usersMobile }, { to: req.body.usersMobile }],
          },
          { from: 1, _id: 0 }
        )
        .exec()
        .then((results) => {
          console.log(results);
          return JSON.parse(JSON.stringify(results));
        })
        .catch((e) => {
          console.log(e);
        });
      let to = await chatMaster
        .find(
          {
            $or: [{ from: req.body.usersMobile }, { to: req.body.usersMobile }],
          },
          { to: 1, _id: 0 }
        )
        .exec()
        .then((results) => {
          console.log(results);
          return JSON.parse(JSON.stringify(results));
        })
        .catch((e) => {
          console.log(e);
        });
      let array = from.concat(to);
      let set = new Set();
      array.forEach((element) => {
        if (element.from && element.from != req.body.usersMobile) {
          set.add(element.from);
        } else if (element.to && element.to != req.body.usersMobile) {
          set.add(element.to);
        }
      });
      console.log(set);

      // set.forEach(async (element)=>{

      for await (let element of set) {
        let messageObject = {};
        let chats = await chatMaster
          .find({
            $or: [
              { from: req.body.usersMobile, to: element },
              { from: element, to: req.body.usersMobile },
            ],
          })
          .exec()
          .then((results) => {
            console.log(results);
            return JSON.parse(JSON.stringify(results));
          })
          .catch((e) => {
            console.log(e);
          });
        let contactName = await userMaster
        .findOne({mobileNumber:element},{userName:1,_id:0})
        .exec()
        .then((results) => {
          console.log(results);
          return JSON.parse(JSON.stringify(results));
        })
        .catch((e) => {
          console.log(e);
        });
        messageObject.mobileNumber = element;
        messageObject.userName = contactName.userName;
        messageObject.chats = chats;
        data.push(messageObject);
      }

      // });

      response["statusCode"] = "0";
      response["statusMessage"] = "Success";
      response["data"] = data;
    } catch (e) {
      console.log(e);
      response.statusCode = "1";
      response.statusMessage = "Failed";
      response.error = e;
    }
    console.log("data", data);
    res.json(response);
  },
};
