const request   = require('request');
const mysql     = require("mysql");

module.exports = {
    
    /**
     * Return random image URLs from an API
     * @param string    keyword - search term
     * @param ini       imageCount - number of random images
     */
    getRandomImage_cb: function (keyword, imageCount, callback){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=4b527ceeaf52c6f2cc9b54a2e6d20194071813a49d4e9a21909b1c020232d328";
        request(requestURL, function (error, response, body) {
        if(!error){
        var parsedData = JSON.parse(body);
        //console.log("image url", parsedData["urls"]["regular"]);
        var imageURLs = [];
        for (let i=0; i<9; i++) {
            imageURLs.push(parsedData[i].urls.regular);
        }
        
        //return imageURLs;
        
        callback(imageURLs);
        
        } else {
            console.log("error", error);
        }
        
        });//request
    },
    
    getRandomImage: function (keyword, imageCount){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=4b527ceeaf52c6f2cc9b54a2e6d20194071813a49d4e9a21909b1c020232d328";
        
        return new Promise( function(resolve, reject) {
        request(requestURL, function (error, response, body) {
        if(!error){
            var parsedData = JSON.parse(body);
            //console.log("image url", parsedData["urls"]["regular"]);
            var imageURLs = [];
            for (let i=0; i<imageCount; i++) {
                imageURLs.push(parsedData[i].urls.regular);
            }
        
        //return imageURLs;
        
        resolve(imageURLs);
        
        } else {
            console.log("error", error);
        }
        
            });//request
        });//promise
    },//function
    
    /*
    *Create a database connection
    */
    createConnection: function(){
        var conn = mysql.createConnection({
        host: "cst336db.space",
        user: "cst336_dbUser008",
        password: "1zglno",
        database: "cst336_db008"
    });
    return conn;
    
    }
};