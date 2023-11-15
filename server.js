const express = require("express");
var cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
const { initDb } = require('./db/connection'); //importing database connection function

//middleware setup
app
  .use(cors()) 
  .use(express.json()) 
//   .use("/", require("./routes")) 
  .use((req, res, next) => {
    //custom middleware to set headers for cors and content type
    res.setHeader("Access-Control-Allow-Origin", "*"); //allow requests from any origin
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key"); // define allowed headers
    res.setHeader("Content-Type", "application/json"); //set response content type to JSON
    next();
  })
  .listen(port, () => {
    console.log(`Web Server is listening at port ${port}`);
  });

// initialize db connection
initDb((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    //log successful db connection
    console.log("Connected to MongoDB");
  }
});
