require("dotenv").config({ path: './.env' });
const app = require('./app');
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected 🔥"))
  .catch((err) => console.log(err));



const DB = process.env.MONGO_URI; 

console.log('Connecting to:', DB); 

module.exports = app;