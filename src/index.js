
require("dotenv").config();
const express = require("express");
//  const path = require("path");
//  the path module is a built-in module in Node.js that provides utilities for working with file and directory paths. 
//  It offers various methods to manipulate and extract information from file paths. In the code snippet you provided, 
//  the path module is used to extract the file extension from the file.originalname.
//  const fs = require("fs"); 
//  const { uploadMiddleware } = require("./middlewares");
//  The fs module is a built-in module in Node.js that provides file system-related operations. 
//  It offers functions for reading from and writing to files, creating and deleting files and directories, 
//  and manipulating file metadata. In the code snippet, the fs module is used to read the contents of a 
//  file synchronously using the fs.readFileSync() function.
const apiRoutes = require('./routes');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api" , apiRoutes);

app.listen(port , ()=>{
    console.log(`Server started successfully at port ${port}`);
});