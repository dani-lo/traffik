var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('traffik', server, {safe: true});
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'traffik' database");
        db.collection('jams', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'jams' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    } else {
        console.log(">>> got an error connecting to db");
        console.log(err)
    }
});
 
exports.findJamById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('jams', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAllJams = function(req, res) {
    db.collection('jams', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addJam = function(req, res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('jams', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateJam = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('jams', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}
 
exports.deleteJam= function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('jams', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var jams = [
    {
		"date" : "24-01-2014",
		"location" : "ubud",
		"user" : "1",
		"description" : "Very bad stuff, go some other way",
		"latlng" : "-8.515496,115.263705"
	},
	{
		"date" : "24-01-2014",
		"location" : "ubud",
		"user" : "1",
		"description" : "Rally bad stuff, go some other way",
		"latlng" : "-8.528908,115.263748"
	},
	{
		"date" : "24-01-2014",
		"location" : "ubud",
		"user" : "2",
		"description" : "Stuck here am desperate",
		"latlng" : "-8.515581,115.260057"
	}];
 
    db.collection('jams', function(err, collection) {
        collection.insert(jams, {safe:true}, function(err, result) {
        	//
        });
    });
 
};