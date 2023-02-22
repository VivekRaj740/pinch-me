const mongoose = require("mongoose");
const DBConfigs = require("../config/db-config");
mongoose.set("strictQuery", false);

const dbConfig = DBConfigs.mongodb;
const host = dbConfig.host;
const port = dbConfig.port;
const database = dbConfig.database;

mongoose
  .connect(`${host}:${port}/${database}`, { useNewUrlParser: true })
  .then(() => {
    // mongoose.connect("mongodb://127.0.0.1:27017/scm_test_db", { useNewUrlParser: true }).then(()=>{
    console.log("connected Mongo");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = mongoose;
