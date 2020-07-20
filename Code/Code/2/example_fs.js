console.log('Node.js did this');

const fs = require("fs");

// citire sync
// let file = fs.readFileSync("example.js", "UTF-8"); // file e un byte array, daca nu pui encodarea "UTF-8"
// console.log(file);

fs.readFile("example.js", "UTF-8", afterReadFile);
console.log('standing by');

function afterReadFile(error, fileData) {
    if (error) {
        console.log(error);
    } else {
        console.log(fileData);
    }
}

function readFile(path, encoding, callback) {
    // do file related stuff
    //
    
    let error;
    let fileData;

    callback(error, fileData);
}