const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_MMBC;
const client = new MongoClient(url);

/**
 * 
 * @param {any} document for auth collection on MMBC database on Mongodb
 */
module.exports.save = async (document) => {

  await client.connect();
  const db = client.db('MMBC');
  const collection = db.collection('mfa');
  await collection
    .findOne({ userName: document.userName, email: document.email })
    .then(existingDocument => { 
      if (existingDocument) {
        collection.deleteOne(existingDocument);
      }
    });

  await collection.insertOne(document);
  client.close();
};

