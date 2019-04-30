//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
//const sql = require('mssql/msnodesqlv8');

var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
    user:  'sa',
    password: 'admin!23', 
    server: '35.247.106.45',
    database:"F8HACK"
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
     sql.connect(dbConfig, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
         }
         else {
                  console.log("Connected to the database ");
                  // create Request object
                  var request = new sql.Request();
                  // query to the database
                  request.query(query, function (err, recordset) {
                  if (err) {
                              console.log("Error while querying database :- " + err);
                              res.send(err);
                              }
                              else {
                                 console.log("Success");
                                 res.send(recordset);
                             }
                        });
         }
      });           
}

//GET API
app.get("/api/test", function(req , res){
                //var query = "select value from [test]";
                var query="select top 1 (CAST((select value from test where step=1) AS VARCHAR(1))+CAST((select value from test where step=2) AS VARCHAR(1))+CAST((select value from test where step=3) AS VARCHAR(1))+CAST((select value from test where step=4) AS VARCHAR(1))) as steps from test";
                executeQuery (res, query);
});

//POST API
 app.post("/api/test", function(req , res){
               /* var query = "INSERT INTO [test] (col1,col2) VALUES ('"+ req.body.col1 + "','" + req.body.col2+"')";
               executeQuery (res, query);*/
               console.log(req.body.payload);
               if(req.body.payload==0)
                  var query = "UPDATE [test] SET value=0";               
               else
                  var query = "UPDATE [test] SET value=1 where step=" + req.body.payload;

               executeQuery (res, query);

               res.status(200).json(
                  {
                     status:"success"
                  }  
               );               
});

//PUT API
 app.put("/api/test/:step", function(req , res){
               console.log(req.step);
               if(req.step==0)
                  var query = "UPDATE [test] SET value=0";               
               else
                  var query = "UPDATE [test] SET value=1 where step=" + req.step;
               executeQuery (res, query);
});

// DELETE API
 app.delete("/api/test /:id", function(req , res){
                var query = "DELETE FROM [test] WHERE col1=" + req.params.col1;
                executeQuery (res, query);
});