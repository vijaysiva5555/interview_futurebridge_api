//Schema Imports
const user = require('../schema/main/user')
const { ObjectId } = require('bson')

//DB Collection Schema
const db = {
  user  
}

/**All mongoose queryfunction and normal functions */





const findDocuments = async (collection, filter, options) => {
  try {
    let result = await db[collection].find(filter, options);

    return result;
  } catch (error) {
    console.error("Error find documents: ", error)

    throw error;
  }
}


const insertSingleDocument = async (collection, document) => {
  try {
    let result = await db[collection].create(document)

    return result;
  } catch (error) {
    console.error("Error inserting document: ", error)

    throw error;
  }
}

const updateOneDocument = async (collection, filter, update) => {
  try {
    let result = await db[collection].updateOne(filter, update)

    return result;
  } catch (error) {
    console.error("Error updating document: ", error)

    throw error;
  }
}

const findByIdAndUpdate = async (collection, id, update) => {
  try {
    let filter = { _id: new ObjectId(id) };
    let result = await db[collection].updateOne(filter, update)

    return result;
  } catch (error) {
    console.error("Error finding and updating document by ID: ", error)

    throw error;
  }
}




module.exports = {
  findDocuments, //
  insertSingleDocument, //
  updateOneDocument, //
  findByIdAndUpdate //
  }