const MongoClient = require('mongodb').MongoClient
const fs = require('fs');

module.exports = config => {
  console.log("Connecting to MongoDB")
  MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
    if (err) console.log(err)
    var dbo = db.db(config.dbName);
    console.log("Querying all documents")
    dbo.collection(config.dbCollection).find({}).toArray(function(err, result) {
      if(err) throw err
      console.log("Writing to file")
      fs.writeFileSync("backup.json", JSON.stringify(result))
      console.log("Finished")
      db.close()
    });
  });
}

