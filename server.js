const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
let PORT = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

// HTML route
const htmlRoute = require("./route/htmlRoute");
app.use(htmlRoute);

// API route
const apiRoute = require("./route/apiRoute");
app.use(apiRoute);

// server listen
app.listen(PORT, ()=>{
    console.log(`PORT ${PORT} listening!`);
});