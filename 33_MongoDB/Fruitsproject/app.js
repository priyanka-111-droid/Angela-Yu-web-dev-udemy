//FRUITS PROJECT

var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://127.0.0.1:27017/fruitsDB";

//connection using NodeJS Driver
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

//insert fruits
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("fruitsDB");
    var myfruits = [
        { name: "Papaya", score:8,review:"great fruit" },
        { name: "Orange", score:6,review:"sour" },
        { name: "banana", score:9,review:"great stuff!" }
    ];


    dbo.collection("fruits").insertMany(myfruits, function(err, res) {
      if (err) throw err;
      console.log("Number of fruits inserted :"+res.insertedCount);
    //   console.log(res);
      db.close();
    });
  });

//find fruits

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("fruitsDB");
    dbo.collection("fruits").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });