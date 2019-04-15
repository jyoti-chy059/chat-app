"use strict";
/*requiring mongodb node modules */
const mongodb = require('mongodb');
const assert = require('assert');

class Database{

	constructor(){
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
	}

	onConnect(){
		const mongoURL = 'mongodb://127.0.0.1:27017/demo';
		return new Promise( (resolve, reject) => {
			this.mongoClient.connect(mongoURL,{ useNewUrlParser: true }, (err, client) => {
				if (err) {
					reject(err);
				} else {
					console.log("Connected successfully to server");
					assert.equal(null, err);
                    resolve([client,this.ObjectID]);
                    //Code to remove the database
                    
					// const db = client.db('demo');
					// db.dropDatabase(function(err, result){
					// 	console.log("Error : "+err);
					// 	if (err) throw err;
					// 	console.log("Operation Success ? "+result);
					// 	// after all the operations with db, close it.
					// 	client.close();
					// });
				}
			});
		});
	}
}
module.exports = new Database();