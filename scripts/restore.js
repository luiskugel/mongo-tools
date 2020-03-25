const MongoClient = require('mongodb').MongoClient
const fs = require('fs');

module.exports = config => {
  let data;

  try {
      data = JSON.parse(fs.readFileSync("backup.json"))
  } catch (error) {
      console.log(error)
      return
  }
  
  console.log("Connecting to MongoDB")
  MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
    if (err) console.log(err)
    var dbo = db.db(config.dbName);
    console.log("Selecting Collection")
    dbo.collection(config.dbCollection).insertMany(data, function(err, result) {
      console.log(`Inserted ${data.length} documents into the collection`);
      db.close()
    });
  });
  
}



