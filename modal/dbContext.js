// const mongoose = require('mongoose');
// mongoose
//     .connect("mongodb://localhost/hyprDB", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.log(err));

    var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  if (err) throw err;
  var db = client.db('hyprDB');
  global.db = db
});