const MongoClient = require('mongodb').MongoClient

module.exports = config => {
	console.log("Connecting to MongoDB")
	MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
	  if (err) console.log(err)
	  var dbo = db.db(config.dbName);
	  console.log("Deleting all documents")
	  dbo.collection(config.dbCollection).deleteMany({}, function(err, obj) {
		if (err) {
		  console.log(err)
		}else{
			console.log("Finished")
		}
		db.close();
	  });
	});
}

