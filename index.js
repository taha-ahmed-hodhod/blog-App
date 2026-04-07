require("dotenv").config({ path: './.env' });
const app = require('./app');
const mongoConnect = require("./config/dcConnections");

mongoConnect();
console.log('Connecting to:', DB); 

module.exports = app;