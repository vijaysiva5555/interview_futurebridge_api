'use strict'
//Imports
const db = require('../../model/mongodb')
const logger = require('../../model/logger')(__filename)


module.exports = function () {
  let router = {};
 
  router.addData = async (req, res) => {
    let data = { status: 0, response: 'invalid Data' }, insertedData;

    try {
      let userData = req.body;

      if (Object.keys(userData).length === 0 && userData.data === undefined) {
        res.send(data)

        return
      }
      userData = userData.data[0];
      insertedData = await db.insertSingleDocument('user',userData);
      data = { status: 1, response: 'inserted Data successfully Completed' }
      res.send(data);
    } catch (error) {
      logger.error(`Error in user controller - register: ${error}`)
      data.response = `${error}`;
      res.send(data);
    }
  }

  router.listData = async (req, res) => {
    let data = { status: 0, response: 'invalid Data' }, listedData;

    try {      
      listedData = await db.findDocuments('user',{status:1});
      data = { status: 1, response: listedData }
      res.send(data);
    } catch (error) {
      logger.error(`Error in user controller - list: ${error}`)
      data.response = `${error}`;
      res.send(data);
    }
  }

  router.listbyid = async (req, res) => {
    let data = { status: 0, response: 'invalid Data' }, listedData;

    try {      
      listedData = await db.findDocuments('user',{status:1,_id:req.body.data[0].id});
      data = { status: 1, response: listedData }
      res.send(data);
    } catch (error) {
      logger.error(`Error in user controller - list: ${error}`)
      data.response = `${error}`;
      res.send(data);
    }
  }

  router.updateData = async (req, res) => {
    let data = { status: 0, response: 'invalid Data' }, updatedData;

    try {
      let userData = req.body;

      if (Object.keys(userData).length === 0 && userData.data === undefined) {
        res.send(data)

        return
      }
      userData = userData.data[0];
      updatedData = await db.updateOneDocument('user',{_id:userData.id},userData);
      if(updatedData.matchedCount === 1) {
        data = { status: 1, response: 'updated Data successfully Completed' };
      }
      res.send(data);
    } catch (error) {
      logger.error(`Error in user controller - updated: ${error}`)
      data.response = `${error}`;
      res.send(data);
    }
  }

  router.deleteData = async (req, res) => {
    let data = { status: 0, response: 'invalid' }, idData, updateStatus, userData

    try {
      idData = req.body;

      if (Object.keys(idData).length === 0 && idData.data === undefined) {
        res.send(data)
        return
      }
      idData = idData.data[0]
      updateStatus = await db.findByIdAndUpdate("user", idData.id, { status: 0 })
      if (updateStatus.modifiedCount !== 0 && updateStatus.matchedCount !== 0) {
      
        return res.send({ status: 1, response: 'Deleted Successfully' })
      }

      return res.send(data)
    } catch (error) {
      logger.error(`Error in user controller - deleteData: ${error}`)
      data.response = error
      res.send(data)
    }
  }

  return router
}