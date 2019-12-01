const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request   = require("request");
const mysql     = require("mysql");
const tools     = require("./tools.js");

//routes

//root route
app.get("/", async function(req, res){
    
    // var requestURL = "https://api.unsplash.com/photos/random?client_id=4b527ceeaf52c6f2cc9b54a2e6d20194071813a49d4e9a21909b1c020232d328"
    // request(requestURL, function (error, response, body) {
    // // console.log('error:', error); // Print the error if one occurred
    // // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // // console.log('body:', body); // Print the API data.
    // if(!error){
    // var parsedData = JSON.parse(body);
    // //console.log("image url", parsedData["urls"]["regular"]);
    // var imageURL = parsedData["urls"]["regular"];
    // res.render("index", {"imageURL":imageURL});
    // } else {
    //     res.render("index", {"error":"unable to load"});
    // }
    
    // });//request
    
    var imageURLs = await tools.getRandomImage("", 1)
    //console.log("imageURL: using promises: " + imageURL);
    res.render("index", {"imageURLs":imageURLs});
    
}); //root route

app.get("/search", async function(req, res){
    //console.dir(req);
    //console.log(req.query.keyword);
    var keyword = req.query.keyword;
    
    var imageURLs = await tools.getRandomImage(keyword, 9)
    //console.log("imageURLs: using promises: " + imageURLs);
    res.render("results", {"imageURLs":imageURLs, "keyword":keyword});
    // tools.getRandomImage(keyword, 9, function(imageURLs){
    //     console.log("imageURLs: using" + imageURLs);
    //     res.render("results", {"imageURLs":imageURLs});
    // });
 });//search
 
 
 app.get("/api/updateFavorites", function(req, res){
     
    var conn = tools.createConnection();       
    
    var sql;
    var sqlParams;
    
    if (req.query.action == "add") {
        sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?,?)";
        sqlParams = [req.query.imageURL, req.query.keyword];
    } else {
        sql = "DELETE FROM favorites WHERE imageURL = ?"
        sqlParams = [req.query.imageURL];
    }
    
    conn.connect(function (err){
    
        if (err) throw err;
    
        conn.query(sql, sqlParams, function(err, result){
                    
                if (err) throw err;
        });//query
    });//connect
    
    res.send("it works!");
    //return conn;

 });//updateFavorites
 
 app.get("/displayKeywords", async function(req, res){
     
    var imageURLs = await tools.getRandomImage("", 1);
    var conn = tools.createConnection();  
    var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY 1";
    
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql, function(err, result) {
            if (err) throw err;
            res.render("favorites", {"rows":result, "imageURLs":imageURLs});
            //console.log(result);
        });//query
    });//connect
     
 });//displayKeywords
 
 app.get("/api/displayFavorites", function(req,res){
     
      
    var conn        = tools.createConnection();  
    var sql         = "SELECT imageURL FROM favorites WHERE keyword = ?";
    var sqlParams   = [req.query.keyword]; 
     
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql, sqlParams, function(err, results) {
            if (err) throw err;
            res.send(results);
            
        });//query
    });//connect
    
 });//displayFavorites

// //server listener
//  app.listen("8080","127.0.0.1", function(){
//      console.log("Express Server is Running...");
//  });

//heroku listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running Express Server...");
});